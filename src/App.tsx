import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import './utils/resetting.css';
import { HomePage } from './components/HomePage';
import productsFromServer from './api/products.json';
import { Footer } from './components/Footer';
import { PageSection } from './types/PageSection';
import { ProductsPage } from './components/ProductsPage';
import { BurgerMenu } from './components/BurgerMenu';
import classNames from 'classnames';

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

  return (
    <div className={classNames('App', { 'no-scroll': isMenuOpen })}>
      <Header
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setIsMenuOpen={setIsMenuOpen}
      />
      {isMenuOpen && (
        <BurgerMenu
          setIsMenuOpen={setIsMenuOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === PageSection.Home && <HomePage phones={phones} />}
      {currentPage === PageSection.Phones && (
        <ProductsPage currentPage={currentPage} product={phones} />
      )}
      {currentPage === PageSection.Tablets && (
        <ProductsPage currentPage={currentPage} product={tablets} />
      )}
      {currentPage === PageSection.Accessories && (
        <ProductsPage currentPage={currentPage} product={accessories} />
      )}
      <Footer />
    </div>
  );
};
