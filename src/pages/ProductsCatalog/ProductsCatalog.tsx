import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './ProductsCatalog.scss';

export const ProductsCatalog = () => (
  <div className="Page">
    <Header />

    <main className="Main">
      <div className="Main-Container">
        <ProductsList />
      </div>
    </main>

    <Footer />
  </div>
);
