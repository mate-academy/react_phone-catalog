import React from 'react';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { Product } from '../../types/Product';

import './Favorites.scss';

type Props = {
  products: Product[],
};

export const Favorites:React.FC<Props> = ({ products }) => {
  const visibleProducts = products.filter(product => localStorage.getItem('favorites')?.includes(product.id));

  return (
    <>
      <Header />
      <main>
        <div className="favorites container">
          <Breadcrumbs />
          <h2 className="favorites__title">Favourites</h2>
          <p className="favorites__count">{`${visibleProducts.length} items`}</p>
          <div className="favorites__content">
            {visibleProducts.map(p => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
