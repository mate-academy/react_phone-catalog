# 📱 Phone Catalog — Rounded Orange

**Live demo:**  
👉 https://github.com/anastasiiaboreiko/react_phone-catalog

This is a learning project built with **React** and **TypeScript**.  
It demonstrates component structure, routing, state management, data filtering, and a production-ready deployment setup using GitHub Pages.

---

## 🚀 Technologies Used

- **React** (Create React App)
- **TypeScript**
- **ESLint** (airbnb-typescript rules)
- **Prettier**
- **GitHub Actions** (automatic deployment)
- **GitHub Pages**

---

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000/ to view it in the browser.

### `npm run build`
Builds the app for production into the `build/` folder.

### `npm test`
Launches the test runner in watch mode.

---

## ⚙️ Auto Deployment (GitHub Actions → GitHub Pages)

Every push to the **main** branch triggers a workflow that:

- installs dependencies  
- builds the project  
- deploys the production build to the **gh-pages** branch  

The live version of the app is always available at:  
https://github.com/anastasiiaboreiko/react_phone-catalog

Deployment workflow file: `.github/workflows/deploy.yml`.

---