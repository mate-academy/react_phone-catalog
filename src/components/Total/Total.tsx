import React, { useState, useContext } from 'react';
import './Total.scss';
import { ProductsContext } from '../../helpers/ProductsContext';
import { Product } from '../../types/Product';

export const Total: React.FC = () => {
  const [isMessage, setIsMessage] = useState(false);

  const { cartItems } = useContext(ProductsContext);

  const newPrice = (product: Product) => {
    const currentProduct = cartItems.find(item => item.id === product.id);

    if (currentProduct) {
      return currentProduct.product.discount > 0
        ? currentProduct.product.price
          - (currentProduct.product.price
            * currentProduct.product.discount) / 100
        : currentProduct.product.price;
    }

    return 0;
  };

  const totalQuantity = cartItems
    .map(item => item.quantity)
    .reduce((quantity1: number, quantity2: number) => {
      return quantity1 + quantity2;
    });

  const amount = cartItems
    .map(item => {
      return item.quantity * newPrice(item.product);
    })
    .reduce((sum1, sum2) => sum1 + sum2);

  const handleClick = () => {
    setIsMessage(true);

    setTimeout(() => {
      setIsMessage(false);
    }, 3000);
  };

  return (
    <div className="total">
      <div className="total__amount">
        {`$${amount}`}
      </div>
      <p className="total__text" data-cy="productQauntity">
        {`Total for ${totalQuantity} items`}
      </p>

      <button
        type="button"
        className="total__button"
        onClick={handleClick}
      >
        Checkout
      </button>

      {isMessage && (
        <p className="total__message">
          We are sorry, but this feature is not implemented yet
        </p>
      )}
    </div>
  );
};
