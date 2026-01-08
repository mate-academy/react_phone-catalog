## How to setup the project
There are different ways to set up a brand-new React project. The most common methods are:

### 1. Create React App _vs_ React + Vite
> Instruction link for CRA: https://create-react-app.dev/docs/getting-started.

> Instruction link for React + Vite: https://vitejs.dev/guide/

It is recommended to select the TypeScript template (`my-app` should be the **real name** of your project app):
```
npx create-react-app my-app --template typescript
```
OR
```
npm create vite my-app -- --template react-ts
```

There is an option to include **Redux** in your template from the beginning. Don't hesitate to add it to the project creation step; it will be easier to implement later.

### 2. Add Eslint, Prettier, husky, lint-staged
Install needed packages for **Eslint**:
```
npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-import-resolver-typescript eslint-plugin-import --save-dev
```
After installing ESLint, you need to create a configuration file:
```
npx eslint --init 
```
Then you should have an **eslintrc.json** file in the root. Configure it as follows:
- Copy from one of your homework projects (don't forget to install required packages starting with `@mate-academy/...`)
- Create your own configuration, for example:
```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "project": "./tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "settings": {
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          "typescript": {}
        }
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint"],
    "rules": {
        // Customize rules here as per your project's needs
    }
} 
```

----
**Prettier** Setup (additional but nice to have):
```
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```
Create Prettier config file:
```
touch .prettierrc
```
Add the required configuration (this is a small example; you must check all rules here: https://prettier.io/docs/en/options.html):
```
{
    "printWidth": 100,   
    "tabWidth": 2,
    "singleQuote": true,
    "semi": true,
}
```
Add Prettier to the .eslintrc.json under the **plugins** and **extends** sections:
```
    ...
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier" // ADDED HERE
    ],
    ...
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "prettier" // ADDED HERE
    ],
    ...
```
Install the **Prettier VSCode** extension if you haven’t installed it already.

----
The last step would be to install **Husky**
```
npm i husky --save-dev
```
Then add following code to you package.json
```
{
    ...
    "husky": {
        "hooks": {
          "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.ts": [
          "eslint --fix",
          "prettier --write"
        ],
        "*.tsx": [
          "eslint --fix",
          "prettier --write"
        ]
    },
    ...
}
```

### 3. Auto deploy
> Check if you have connected your local project to Git (follow the instruction from Github).

You have mostly worked with GitHub Pages for deployment. Here's the instruction to enable auto-deploy using **Github Actions**, so you don't have to run the deploy command on each change in the main branch:
- **First of all follow your old instruction to enable deploy on GH-Pages.**
- Create folder **.github** in the project root. Then inside create anither folder named **workflows**. Inside the workflows folder, make a file named **deploy.yml**.
- Your project files structure should be next:
├── .github
│   ├── workflows
│   │   ├── deploy.yml
├── src
├── public
└── .gitignore
├── package.json
├── package-lock.json
- Paste the next code inside **deploy.yml** file
```
name: Github Page Deploy Workflow

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "12.x"
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: crazy-max/ghaction-github-pages@v1
        with:
          target_branch: gh-pages
          build_dir: build
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
Push your change to main branch.
<details>
  <summary>Explanation of the file content if needed</summary>
  - We are having a Github action named Github Page Deploy Workflow.
  - The Github action gets triggered on push action on the main branch.
  - We are having a job named deploy, we are running this on a ubuntu-latest system somewhere using cloud.
  - Uses refer to the Github repositories we are using to run the commands which we will take a look at soon.
  - We are using Node.js version “12.x”. We then run the commands
        1. npm ci - Equivalent to npm install which installs all the dependencies.
        2. npm run build - Which builds the build folder.
  - We then deploy the project to the gh-pages branch by providing the directory as the build folder.
  - Last but not the least, we authenticate the Github actions workflow using secret GITHUB_TOKEN.
</details>

----

OR you can use easier and most coomon approach to deploy youir applicaiton. 
**There are a couple of similar services for faster auto deploy.**
- [Vercel](https://vercel.com)
- [Render](https://render.com/)
- [Heroku](https://www.heroku.com/)

Just register on one of them and follow the instruction. It's very clear and straight forward. 





