# Group Project Setup

---

Before diving into setting up the project, you might find yourself asking some important questions: 

- What do I need?
- Where do I start?
- Is React with TypeScript alone enough?

and so on. Don’t worry — we’ve got you covered! Let’s outline the steps that will serve as our roadmap. Each step will be explained in greater detail in its respective section.

# 👀 Create a Github Repository

This step is a straightforward one:

1. Create your organisation on GitHub.
2. Within the organisation, create a repository for your frontend.
3. Clone the repository to your local machine.
4. Open the folder in your code editor.

# 🫡 React + Typescript

In the past, there weren’t many options for tackling this problem. You either had to use the [create-react-app](https://create-react-app.dev) utility (which is now outdated and no longer recommended by its maintainers) or dive into setting up a project with bundlers like [Webpack](https://webpack.js.org) (which is undeniably more complex to get started with).

So, what are the modern options? If you check out the [*Start a New React Project*](https://react.dev/learn/start-a-new-react-project) page on the official React documentation, you’ll notice they recommend frameworks like Next.js or Remix, which are built on top of React. But are these the right choices for you right now? Probably not. Why? First, these frameworks are still growing in popularity, and second, they would be an overkill for you and your team at this stage.

So, what should you use instead?

## Vite

<aside>
💡

To fully understand the benefits of Vite, we recommend checking out this page ➡️ [https://vite.dev/guide/](https://vite.dev/guide/)

</aside>

Open the terminal in the folder where you want your project to be located on your machine (the one you cloned from GitHub), and run the following command. You don’t need to specify the project name; the `.` means the project will automatically take the name of the folder you’re currently in.

```
npm create vite@latest . -- --template react-ts
```

Once you open the project in your code editor, run `npm install` to install the dependencies, and then `npm run dev` to start the development server. Open [http://localhost:5173](http://localhost:5173/) in your browser, and you should see the boilerplate page created by the Vite team.

![image.png](Group%20Project%20Setup%20173b8c62d49c808ba4f2f7fb1fa4028d/image.png)

Let’s take a moment to explore what we have after this small step. Quite a lot!

1. Since we used the `react-ts` template, we now have a nicely set up TypeScript environment. If you’re curious about the configuration details, you can check out the `tsconfig.app.json` file. 

<aside>
💡

While this provides a great starting point, you may want to fine-tune these settings later to create a more precise configuration. But for now, there’s no need to worry about that — just focus on getting started!

</aside>

1. We also have a `.gitignore` file, which will come in handy when it’s time to push our changes to GitHub.
2. Another great thing about this step is that it lays the groundwork for our next task: setting up ESLint. But don’t worry — we’ll dive into that in the next chapter.

Finally, you might want to clean up the boilerplate code in the `src` directory. I’m confident you can handle this on your own! 

# 🦄 Eslint

ESLint is the first step in what’s known as Static Analysis Testing (SAT). What does it bring to the table? Greater control over the code you and your team members write!

In the previous step, we mentioned that a lot of ESLint-related setup is already in place. Let’s take a look by opening the `eslint.config.js` file.

```jsx
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
```

As we can see, several plugins have been installed to ensure a smooth ESLint experience right out of the box. These include [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint), [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), and [`eslint-plugin-react-refresh`](https://www.npmjs.com/package/eslint-plugin-react-refresh). Feel free to check out their documentation to gain a deeper understanding of what each plugin offers.

You might also notice `js.config.recommended` and `tseslint.config.recommended` listed under the `extends` property. What’s that about? At some point, the ESLint team realised that many developers frequently use the same rules, so they created a “recommended set of rules” to streamline the setup process. You can explore the [*Rules Reference*](https://eslint.org/docs/latest/rules/) to view the full list of rules, including those enabled by the recommended configuration. Quite a lot, right?

What’s next? You might want to consider adding a few additional plugins:

1. [MUST] [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) — Adds React-specific linting rules.
2. [MUST] [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#installation) — Ensures that ESLint and Prettier (our next step) work seamlessly together.
3. [RECOMMENDED] [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) — It helps you become a better developer by emphasising the importance of accessibility in your JSX.
4. [RECOMMENDED] [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) — Prevents import bugs and sorts your imports automatically.

<aside>
💡

We could expand this list even further or add more specific rules, but here’s the key point: the more plugins you add, the higher the chance that they might clash rather than work harmoniously together. So, proceed with caution!

</aside>

Run the following command to install the plugins listed above as development dependencies:

```
npm i -D eslint-plugin-react eslint-config-prettier
```

Try configuring the plugins based on their documentation. Eventually, your `eslint.config.js` should look something like this:

```jsx
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // This is a config, so it goes under "extends"
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react, // We register the "eslint-plugin-react" plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules, // This way we use recommended set of rules from "eslint-plugin-react" plugin

      "react/react-in-jsx-scope": "off", // This rule is included in "recommended", but since React 17 it is not needed!
 
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
```

<aside>
💡

As you can see, it’s absolutely fine to turn off rules from the plugins. In the future, you might want to do the same with other rules, and that’s perfectly okay. Trust me, an ESLint configuration is never going to be perfect! 😉

</aside>

Add the following line to your `package.json` scripts:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --fix", // <--- [NEW]
    "preview": "vite preview"
  },
```

Install the [*ESLint extension*](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for VSCode. Now, we’re all set to proceed to the next steps!

# 💅🏻 Prettier

Prettier is responsible for standardising the formatting of your code, and it’s incredibly easy to set up. You can follow the [*Official Installation Guide*](https://prettier.io/docs/en/install), or simply follow the steps below:

Install Prettier as development dependency:

```
npm i -D prettier
```

Create a `.prettierrc` configuration file. You can either do this manually or run the following command:

```
touch .prettierrc
```

Fill the `.prettierrc` file with the rules you prefer. To explore different rules, check out the [*Options Page*](https://prettier.io/docs/en/options). Here is the example:

```json
{
  "experimentalTernaries": true,
  "singleQuote": true,
  "quoteProps": "consistent",
  "singleAttributePerLine": true,
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}

```

Add the following lines to your `package.json` scripts:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "format": "prettier . --ignore-path .gitignore --write", // <--- [NEW] Runs prettier ignoring the files from .gitignore
    "lint": "eslint . --fix",
    "fix-style": "npm run format & npm run lint", // <--- [NEW] The command to run the prettier first and then the linter
    "preview": "vite preview"
  },
```

Install the [*Prettier extension*](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VSCode. See you in the next step!

# 👮🏼‍♂️ Pre-commit checks

From the title of this step, you can probably guess what we’re going to do. In the previous step, we created a `fix-style` script that runs both Prettier and ESLint, but can we be sure that every developer on the team will take full advantage of it? I’m not so sure, and you shouldn’t be either. So, let’s ensure that code which doesn’t adhere to our Prettier and ESLint rules can’t be committed!

## Husky & lint-staged

[*Husky*](https://typicode.github.io/husky/) is the package responsible for running specified scripts before commits, and [*lint-staged*](https://www.npmjs.com/package/lint-staged/v/12.3.2) ensures that you run checks only against staged files.

<aside>
💡

You can follow the official installation guide for both (set up [*Husky*](https://typicode.github.io/husky/get-started.html) first, followed by [*lint-staged*](https://www.npmjs.com/package/lint-staged/v/12.3.2#installation-and-setup)), or simply follow the steps below.

</aside>

Add Husky as development dependency:

```
npm i -D husky
```

Run the following command. It will create the `prepare` script in `package.json` and `.husky` folder:

```
npx husky init
```

Install lint-staged by running:

```
npx mrm@2 lint-staged
```

Open the `pre-commit` file in the `.husky` folder and ensure that it contains only one line with the following command: `npx lint-staged`.

Open `package.json` and replace the generated “lint-staged” with this one:

```json
  "lint-staged": {
    "*": "npm run fix-style"
  }
```

At this stage, let’s try to stage, commit and push our changes to Github! When you commit changes you should see the Prettier and ESLint executing in the terminal.

<aside>
💡

If you get this warning `'.husky/pre-commit' hook was ignored because it's not set as executable.` simply run this command `chmod +x .husky/pre-commit`

</aside>

# 🤖 Github actions

**GitHub Actions** is a mechanism that allows us to run various scripts based on actions in our repository. For example, you can set up actions to "run something when someone pushes to, or creates a pull request for, a specific branch." Sounds interesting?

## Deployment

Let’s setup deployment to Github Pages when someone pushes to `main` branch!

Create a GitHub Action Workflow file: In your repository, create the following folder structure:

```
.github/
  workflows/
    deploy.yml
```

Inside the `deploy.yml` file, simply insert the code below:

```yaml
name: Deploy to GitHub Pages

permissions:
  contents: write # Required to push to the repository
  pages: write # Required for GitHub Pages deployment

on:
  push:
    branches:
      - main # Make sure you have the correct name of your branch here

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Checkout the code
      - name: Checkout code
        uses: actions/checkout@v2

      # Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20' # Adjust Node.js version as needed

      # Install dependencies
      - name: Install dependencies
        run: |
          npm install

      # Build the app
      - name: Build the app
        run: |
          npm run build

      # Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages # Branch where the app will be deployed
          folder: dist # Folder containing the built React app
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Automatically generated token for authentication

```

If you see a white screen when you open your deployment link, you may need to tweak the `vite.config.ts` file a little bit:

```
export default defineConfig({
  plugins: [react()],
  base: './', // <--- [NEW] add this line
});
```

<aside>
💡

Or, you can use an easier and more common approach to deploy your application. **There are several services available for faster, automatic deployment:**

- [Vercel](https://vercel.com/)
- [Render](https://render.com/)
- [Heroku](https://www.heroku.com/)

Simply register on one of these platforms and follow the instructions. It's very clear and straightforward.

</aside>
