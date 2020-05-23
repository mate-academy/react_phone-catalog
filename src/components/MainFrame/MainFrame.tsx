
import React from 'react';
import { Product, CatalogPropsType } from '../../interfaces';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './MainFrame.scss';


export const MainFrame = ({
  products,
  cart,
  favorites,
  setFavorites,
  setCart
}: CatalogPropsType) => {
  return (
    <div className="MainFrame">
      {products.map((product: Product) => {
        return (
          <ProductCard
            product={product}
            cart={cart}
            favorites={favorites}
            setFavorites={setFavorites}
            setCart={setCart}
          />
        );
      })}
    </div>);
}

