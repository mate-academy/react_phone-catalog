import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import './utils/resetting.css';
import { HomePage } from './components/HomePage';
import productsFromServer from './api/products.json';
import { PageSection } from './types/PageSection';
import { ProductsPage } from './components/ProductsPage';
import { BurgerMenu } from './components/BurgerMenu';
import classNames from 'classnames';
import { Favourites } from './components/Favourites';

const phones = productsFromServer.filter(
  product => product.category === 'phones',
);

const tablets = productsFromServer.filter(
  product => product.category === 'tablets',
);

const accessories = productsFromServer.filter(
  product => product.category === 'accessories',
);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(PageSection.Home);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  return (
    <div className={classNames('App', { 'no-scroll': isMenuOpen })}>
      <Header
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setIsMenuOpen={setIsMenuOpen}
        favourites={favourites}
      />
      {isMenuOpen && (
        <BurgerMenu
          setIsMenuOpen={setIsMenuOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === PageSection.Home && (
        <HomePage
          phones={phones}
          favourites={favourites}
          setFavourites={setFavourites}
          cart={cart}
          setCart={setCart}
        />
      )}
      {currentPage === PageSection.Phones && (
        <ProductsPage
          currentPage={currentPage}
          product={phones}
          setFavourites={setFavourites}
          favourites={favourites}
          cart={cart}
          setCart={setCart}
        />
      )}
      {currentPage === PageSection.Tablets && (
        <ProductsPage
          currentPage={currentPage}
          product={tablets}
          setFavourites={setFavourites}
          favourites={favourites}
          cart={cart}
          setCart={setCart}
        />
      )}
      {currentPage === PageSection.Accessories && (
        <ProductsPage
          currentPage={currentPage}
          product={accessories}
          setFavourites={setFavourites}
          favourites={favourites}
          cart={cart}
          setCart={setCart}
        />
      )}
      {currentPage === PageSection.Favorites && (
        <Favourites
          favourites={favourites}
          models={productsFromServer}
          setFavourites={setFavourites}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
};
