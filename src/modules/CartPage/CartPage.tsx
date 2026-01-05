import React from 'react';
import './CartPage.module.scss';
import { Header } from 'shared/Header';
import { Footer } from 'shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import { ProductCard } from 'shared/ProductCard';

export const CartPage: React.FC = () => {
  const { cart } = useProducts();

  return (
    <>
      <Header />

      {cart.length === 0 ? (
        <p>No products in cart yet</p>
      ) : (
        <div>
          {cart.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};
