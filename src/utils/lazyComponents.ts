import React from 'react';

export const ProductCard = React.lazy(
  () => import('../components/ProductCard/ProductCard'),
);
export const Categories = React.lazy(
  () => import('../components/Categories/Categories'),
);
export const Cart = React.lazy(() => import('../components/Cart/Cart'));
export const Header = React.lazy(() => import('../components/Header/Header'));
export const Footer = React.lazy(() => import('../components/Footer/Footer'));
export const ProductDetails = React.lazy(
  () => import('../components/ProductDetails/ProductDetails'),
);
export const Favourites = React.lazy(
  () => import('../components/Favourites/Favourites'),
);
export const Main = React.lazy(() => import('../components/Main/Main'));
export const HeaderTitle = React.lazy(
  () => import('../components/HeaderTitle/HeaderTitle'),
);
export const HeaderSlider = React.lazy(
  () => import('../components/HeaderSlider/HeaderSlider'),
);
export const ProductCategory = React.lazy(
  () => import('../components/ProductCategory/ProductCategory'),
);
