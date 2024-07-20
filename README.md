# React Product Catalog

[DEMO](https://katsubodmytro.github.io/react_phone-catalog/)\n
[MOCKUP LIGHT](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original)\n
[MOCKUP DARK](https://www.figma.com/file/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark)

### Stack technologies were used:

[![My Skills](https://skillicons.dev/icons?i=react,redux,ts&perline=3)](https://skillicons.dev)

---

<h2>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" align="center" alt="html5" width="40" height="40"/>
  HTML
</h2>

<p>
  I used HTML to build semantically correct pages.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" align="center" alt="css3" width="40" height="40"/>
  CSS
</h2>

<p>
  For partial styling was used CSS3. 
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" align="center" alt="bootstrap" width="40" height="40"/>
  Bootstrap
</h2>

<p>
As the main base of styles was used Bootstrap. 
  This library has a great base of ready-to-use components and flexible singleton classes that modify only one parameter at once.
  This feature helped to style components without writing any specific selectors inside css file which increased the speed of layout creation. 
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" align="center" alt="angular" width="40" height="40"/> 
  Angular
</h2>

<p>
  Angular is main framework I chose for this project because it provides a robust and efficient way to build complex user interfaces with reusable components. 
  Its build in features helps you to create complicated project in short time without any issues, 
  by using build-in features it becomes possible to implement authentication, managed to connect the components with their common data. 
  Additionally, Angular declarative programming model simplifies the development process and makes it easier to maintain codebase over time.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" align="center" alt="javascript" width="40" height="40"/> 
  JavaScript
</h2>

<p>
  I used JS in my Angular project, mainly to send requests to an API that was also implemented with using Firebase realtime DB.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" align="center" alt="typescript" width="40" height="40"/>
  TypeScript
</h2>

<p>
  With the help of TypeScript, I was able to type everything that I could in project, 
  which allowed me to avoid many possible errors and make JavaScript more predictable.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" alt="webpack" align="center" width="40" height="40"/>
  Webpack
</h2>

<p>
  As a main builder i decided to use webpack because of it's good compatibility with angular and great support from community.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" align="center" alt="firebase" width="40" height="40"/>
  Firebase
</h2>

<p>
  As a main backend service I decided to use firebase, because of simplicity of creation your own API with auth.
</p>

<h2>
  <img src="https://raw.githubusercontent.com/ReactiveX/rxjs/master/docs_app/src/assets/images/logos/Rx_Logo_S.png" align="center" alt="rxjs" width="40" height="40"/>  
  Rxjs
</h2>

<p>
  By using rxjs I managed to handle difficult logic in Angular. 
  Besides Rxjs library is a built-in feature in Angular that guarantees good maintenance from creators.
</p>

---

### How to use:

<h2>
  Authentication
</h2>

<img src="./img/auth.png" alt="auth page">

<p>
  At the beginning you have almost nothing to use (there is possible to use only shopping list tab to add some products to buy).
  To access for all features of this app you need to have own account. 
  It's possible to create your own one by pressing <strong>Switch to Sign Up</strong> button and pass your credentials. (Instead of this way I recommend to use test account with:
</p>
<div>
<pre style="padding: 10px; margin: 0; width: max-content">
Email: test@test.com 
Password: test123
</pre>
</div>

If you were successful with authenticate, you would have used all functional of this app.

<h2>
  Recipes list
</h2>

<img src="./img/recipes-tab.png" alt="recipes list page">

<p>
  From now you can see the new tabs on header. 
  The <strong>Recipes</strong> tab is redirecting you to recipes list where you can manage the existed recipes or create new one.
  There is also appeared <strong>Logout</strong> button which provides you possibility to leave current account and <strong>Manage</strong> select where you can find two options:
</p>

<p>
  1. <strong>Fetch Data</strong>: By pressing on this button the new recipes will be fetched from Firebase DB.
  <br/>
  2. <strong>Save Data</strong>: By pressing on this button your current recipe list rewrite the one which exists in Firebase DB.
</p>

<p>
  By clicking on one of the existed recipe you will be redirected to recipe details.
  Besides there is a button <strong>New Recipe</strong> which gives you a possibility to create your own recipe.
</p>

<h2>
  Recipe Details
</h2>

<img src="./img/recipes-details.png" alt="recipes details page">

<p>
  Here you can see all the information about the recipe such as image of it, name, description and ingredients.
  Besides here you can manage the recipe. If you click on <strong>Manage Recipe</strong> select you will see 3 options:
</p>

<p>
  1. <strong>To Shopping List</strong>: By pressing on this button the ingredients which this recipe has will be sent to shopping list.
  <br/>
  2. <strong>Edit Recipe</strong>: By pressing on this button you will be redirected to edit recipe component.
  <br/>
  2. <strong>Delete Recipe</strong>: By pressing on this button the recipe is going to be deleted.
</p>

<h2>
  New Recipe
</h2>

<img src="./img/new-recipe.png" alt="new recipe page">

<p>
  This is the page where you can create new recipe by filling existed input fields.
  For adding ingredients you need to press <strong>Add ingredient</strong> button which will create additional input fields for ingredient name and it's quantity.
</p>

<h2>
  Edit Recipe
</h2>

<img src="./img/recipe-edit.png" alt="new recipe page">

<p>
  Here <strong>New Recipe</strong> component was reused. You can edit existed recipe info and save new one by clicking on <strong>Save</strong> button or cancel your changes by clicking on <strong>Cancel</strong> button.
</p>

<h2>
  Shopping List
</h2>

<img src="./img/shopping-list-tab.png" alt="new recipe page">

<p>
  This is shopping list where you can find your current selected products.
  Here will be some custom products by default which you can also delete by clicking on them and after on <strong>Delete</strong> button.
  Besides it is possible to edit them in the same way but instead of clicking on <strong>Delete</strong> button you need to press <strong>Save</strong> button.
  Here also a <strong>Clear</strong> button which resets the <strong>Name</strong> and <strong>Amount</strong> fields.
  This list can be extended by new products which you can pass from recipe details page by clicking on <strong>To Shopping List</strong> button.
</p>



---

Thank you for your attention🥰🥰🥰
