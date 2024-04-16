#!/usr/bin/env node

// Usage: npx ts-simple-starter my-app

const spawn = require('cross-spawn');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const templateQuestion = {
	'pure-ts': 'Pure TS',
	express: 'Express',
	'complete-express': 'Complete Express (Express, Prisma, Docker, Docker Compose, Postgres, JWT + Auth Flow)'
};

const questions = [
	{
		type: 'list',
		name: 'template',
		message: 'Which template would you like to use?',
		choices: [templateQuestion['pure-ts'], templateQuestion['express'], templateQuestion['complete-express']]
	}
];

const generateProject = async (templatePath, projectName) => {
	const currentPath = process.cwd();

	const startWithDot = projectName.startsWith('.');
	const startWithSlash = projectName.startsWith('/');
	const startWithTilde = projectName.startsWith('~');
	const startWithHyphen = projectName.startsWith('-');

	const isInvalidProjectName = startWithDot || startWithSlash || startWithTilde || startWithHyphen;

	if (isInvalidProjectName) {
		console.log(`Invalid project name: ${chalk.red(projectName)}`);
		console.log('Project name cannot include special characters or spaces.');
		console.log('Please use a different project name.');
		console.log();
		process.exit(1);
	}

	// Create a project directory with the project name.
	const currentDir = process.cwd();
	const projectDir = path.resolve(currentDir, projectName.trim());

	console.log(`Creating a new project in ${chalk.green(projectDir)}`);

	fs.mkdirSync(projectDir, { recursive: true });

	const templateDir = path.resolve(__dirname, templatePath);
	fs.cpSync(templateDir, projectDir, { recursive: true });

	// read the project's package.json without require
	const projectPackageJson = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8'));

	// Update the project's package.json with the new project name
	projectPackageJson.name = projectName;

	fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(projectPackageJson, null, 2));

	// Run `npm install` in the project directory to install
	// the dependencies. We are using a third-party library
	// called `cross-spawn` for cross-platform support.
	// (Node has issues spawning child processes in Windows).
	// enter the project directory
	process.chdir(projectDir);

	// emoji package is used to display emojis in the console.
	console.log(`${chalk.green('Installing packages... 📦')}`);

	spawn.sync('npm', ['install'], { stdio: 'inherit' });

	console.log(`${chalk.green('Success!')} Your new project is ready. 🚀`);
};

const getTemplatePathFromAnswers = (answers) => {
	const { template } = answers;

	// this is the path to the templates folder
	switch (template) {
		case templateQuestion['pure-ts']:
			return 'template-pure-ts';
		case templateQuestion['express']:
			return 'template-express';
		case templateQuestion['complete-express']:
			return 'template-complete-express';
		default:
			return 'template-pure-ts';
	}
};

const main = async () => {
	const args = process.argv.slice(2);

	if (args.includes('--version') || args.includes('-v')) {
		console.log(require('./package.json').version);
		process.exit(1);
	}

	if (args.includes('--help') || args.includes('-h')) {
		console.log(`Usage: npx ts-simple-starter ${chalk.green('<project-directory>')}`);
		console.log();
		console.log('For example:');
		console.log(`  npx ts-simple-starter ${chalk.green('my-app')}`);
		console.log();
		process.exit(1);
	}

	const projectName = process.argv[2];

	if (!projectName) {
		console.error('Please specify the project directory:');
		console.log(`  npx ts-simple-starter ${chalk.green('<project-directory>')}`);
		console.log();
		console.log('For example:');
		console.log(`  npx ts-simple-starter ${chalk.green('my-app')}`);
		console.log();
		process.exit(1);
	}

	// Prompt the user with the defined questions
	inquirer
		.prompt(questions)
		.then((answers) => {
			const templatePath = getTemplatePathFromAnswers(answers);
			generateProject(templatePath, projectName);
		})
		.catch((error) => {
			console.error('Error occurred:', error);
		});
};

main();
