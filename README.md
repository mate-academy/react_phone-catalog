# React Phone catalog

## Description:
This project is an online store that consists of six pages.
In this project are realized next components and pages:
- a header with logo, navigation, and search bar;
- a footer with logo, navigation, and a 'go to top' button;
- a 'go to back' button;
- a custom nesting line;
- a Loader component when you receive some data from the server;
- a Wait function for convenient display of the Loader;
- an ErrorMessage component when you didn't get the data from the server;
- an advanced carousel;
- a slider with discounted products;
- a slider with new products;
- a filter with two custom selects;
- a products list (a type of product in this component depends on the Props parameters);
- a custom pagination;
- a DetailsImages component allows you to view all images of the product;
- a DetailsSelects component shows similar products with a different color or memory;
- a slider with 'you may also like' products;
- a FavoritesPage contains a list of products you have liked earlier;
- a CartPage contains a list of products you have added to the cart,
total number of products and total price.
- a NotFoundPage appears when you have an incorrect link address.

The project has three screen extensions:
  - mobile (to 743px)
  - tablet (744-1259px);
  - desktop (from 1260px).
The project architecture:
  - 'pages' folder with all page components and their styles;
  - 'components' folder - all extra components and their styles;
  - 'style' folder - utils and extra styles;
  - 'types' folder - files with interfaces, types, and enums;
  - 'helpers' folder - helper functions;
  - 'images' folder;
  - 'fonts' folder.

## Extra technologies:
1) React.js:
  - created universal components for multiple using (Header, Footer, Slider, ProductCard, Loader, ErrorMessage, etc.) and even one universal page (ProductPage);
  - React Router is used (<Routers>, <Router>, <NavLink>, useParams(), useSearchParams(), useNavigate(), useLocation()) for greater readability and code simplicity;
  - types, interfaces, and enums are used in almost every component.
2) TypeScript is used in the whole project.
  It ensures security from getting unexpected values.
3) Sass with using:
  - a BEM;
  - variables;
  - mixins and medias (@mixin and @media);
4) Products that are added to favorites or to the cart are saved in LocalStorage.
5) The Debounce function is added to the search query to save capacity.

## DEMO LINK:
https://Soi4An.github.io/react_phone-catalog/

## Figma design:
https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2
