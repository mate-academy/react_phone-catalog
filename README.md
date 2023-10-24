# React Phone catalog

## Description:
This project is online store that consist 6 pages.
AllPages have flexeble header (with logo, navigation and
search line in some pages) and footer (with logo, navigation and
a 'go to top' button). Some pages have 'go to back' button and
custom nesting line. Pages that receive some data from the server,
use Loader component and the Wait function for convenient display.
Of course, if you didn't get the data, you will see an error.

The [HomePage] has advanced carousel, slider with discounted products,
section with all categories and slider with new products.
The [ProductPage] has filter with two custom selects, products list
(a type of product in this component depends on the Props parametrs)
and custom pagination.
The [ProductDetailsPage] has detailed information about product
that showed on 4 sections. The 'images' section allowes you to view
all images of the product. The 'selects' section allowes you to view
similar products with a different color or memory. Also the page has
a slider with 'you may also like' products.
The [FavoritesPage] contains a list of products you have liked.
The [CartPage] contains a list of products you have added to the cart,
total number of products and total price.
The [NotFoundPage] contains the Header for transitoin and
a paragraph with the text "Page not found".

The project has 3 screen extensions:
  - mobile (to 743px)
  - tablet (744-1259px);
  - desktop (from 1260px).
The project architecture:
  - 'pages' folder with all page components and their styles;
  - 'components' folder - all extra components and their styles;
  - 'style' folder - utils and extra styles;
  - 'types' folder - files with interfeces, types and enums;
  - 'helpers' folder - halper functions;
  - 'images' folder;
  - 'fonts' folder.

## Extra technologies:
1) React.js:
  - created universal components for multiple using (Header, Footer, Slider, ProductCard, Loader, ErrorMessage e.c.) and even one universan page (ProductPage);
  - React Router is used (<Routers>, <Router>, <NavLink>, useParams(), useSearchParams(), useNavigate(), useLocation()) for greater readability and code simplicity;
  - types, interfaces and enums is used in almost every component.
2) TypeScript is used in whole project.
  It ensures security from getting unexpected values.
3) Sass with using:
  - a BEM;
  - variables;
  - mixins and medias (@mixin and @media);
4) Products that added to favorites or to the cart are saved in LocalStorage.
5) Debounce function is added to the search query to save capacity.

## DEMO LINK:
https://Soi4An.github.io/react_phone-catalog/

## Figma design:
https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2
