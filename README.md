# TS Simple Starter

A simple CLI to start your TS project with minimal configuration.

Basic configuration includes:

1. TS
2. Eslint + Prettier
3. Jest
4. Path Aliases
5. Choose the template you want

For now we have 3 templates:

1. Pure TS
2. Express with TS
3. Complete Express (Express, Prisma, Docker, Docker Compose, Postgres, JWT + Auth Flow)

#### Get Started Immediately

You don't need to install or configure tools like TS version, ESlint, Prettier and Path aliases.
<br>
They are preconfigured and you can change anything you want (TS version, ESlint version, anything).

Just run the command, and you're good to go.

## Quick Overview

```
npx ts-simple-starter my-app
cd my-app
npm run dev
```

### Running tests in the project folder

```
npm run test
```

## Path aliases

You can simple import everything that is inside `src/` or `tests/` just using `import anything from '@/any-folder'` or `import tests from '@/tests/any-folder'`

## How to contribute

1. Fork the project
2. Clone your forked repo locally
3. Create a new branch in your own forked repo with a brief name like `feat/feature-name`
4. `npm run install` to install the packages
5. Make changes in the `index.js` file, that's the main entrypoint
6. If you want to create a new template, create under the root folder, just like `template/`
7. Add the new template to the `index.js` entrypoint -> `getTemplatePathFromAnswers()` function
8. Run `node . my-app` to run the entrypoint with the new code you just wrote
9. Create the PR from your fork to the main repo
