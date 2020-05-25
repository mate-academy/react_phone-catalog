
import React from 'react';
import { Product, CatalogPropsType } from '../../interfaces';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './MainFrame.scss';


export const MainFrame = ({
  products,
  cart,
  setCart,
  favorites,
  setFavorites,
}: CatalogPropsType) => {
  return (
    <div className="MainFrame">
      {products.map((product: Product, index) => {
        return (
          <ProductCard
            key={product.id + index}
            product={product}
            cart={cart}
            setCart={setCart}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        );
      })}
    </div>);
}

