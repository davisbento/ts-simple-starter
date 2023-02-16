#!/usr/bin/env node

// Usage: npx ts-simple-starter my-app

const spawn = require('cross-spawn');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// The first argument will be the project name.
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

const isVersion = projectName.split(' ').includes('--version') || projectName.split(' ').includes('-v');

if (isVersion) {
	console.log(require('./package.json').version);
	process.exit(1);
}

const isHelp = projectName.split(' ').includes('--help') || projectName.split(' ').includes('-h');

if (isHelp) {
	console.log(`Usage: npx ts-simple-starter ${chalk.green('<project-directory>')}`);
	console.log();
	console.log('For example:');
	console.log(`  npx ts-simple-starter ${chalk.green('my-app')}`);
	console.log();
	process.exit(1);
}

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

// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.
const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
fs.renameSync(path.join(projectDir, 'gitignore'), path.join(projectDir, '.gitignore'));

const projectPackageJson = require(path.join(projectDir, 'package.json'));

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
