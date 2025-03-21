import React from 'react';
import { ProductDetails } from '../../types/ProductTypes';

interface CartProps {
  product: ProductDetails[];
}

export const ByCardItem: React.FC<CartProps> = ({ product }) => {
  return (
    <div>
      <h2>Cart</h2>
      {product.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        product.map(item => (
          <div key={item.id} className="cart-item">
            <img
              src={item.images[0]}
              alt={item.name}
              className="cart-item__image"
            />
            <h3>{item.name}</h3>
            <p>{`Price: $${item.priceRegular}`}</p>
          </div>
        ))
      )}
    </div>
  );
};
