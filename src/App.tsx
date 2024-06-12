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
import { Cart } from './components/Cart';
import { useAppContext } from './AppContext';
// import { Products } from './types/Products';
// import { useSearchParams } from 'react-router-dom';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage } = useAppContext();

  return (
    <div className={classNames('App', { 'no-scroll': isMenuOpen })}>
      <Header setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} />}
      {currentPage === PageSection.Home && (
        <HomePage phones={phones} tablets={tablets} accessories={accessories} />
      )}
      {currentPage === PageSection.Phones && <ProductsPage product={phones} />}
      {currentPage === PageSection.Tablets && (
        <ProductsPage product={tablets} />
      )}
      {currentPage === PageSection.Accessories && (
        <ProductsPage product={accessories} />
      )}
      {currentPage === PageSection.Favorites && (
        <Favourites models={productsFromServer} />
      )}
      {currentPage === PageSection.Cart && <Cart models={productsFromServer} />}
    </div>
  );
};
