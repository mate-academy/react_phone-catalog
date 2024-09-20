import React, { useContext } from 'react';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { CatalogContext } from '../../CatalogContext';
import classNames from 'classnames';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const ProductCount: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, setCart } = useContext(CatalogContext);
  const _ = require('lodash');
  const numberOfProduct = _.countBy(cart, 'name');
  const productName = product.name;

  const currentCount = numberOfProduct[productName];

  return (
    <div className="product-count">
      <button
        className={classNames('product-count__btn icon icon--minus', {
          _disable: numberOfProduct[productName] === 1,
        })}
        onClick={() => {
          if (currentCount > 1) {
            const removeIndex = cart.findIndex(
              item => item.name === product.name,
            );
            const updatedCart = [
              ...cart.slice(0, removeIndex),
              ...cart.slice(removeIndex + 1),
            ];

            setCart(updatedCart);
          }
        }}
      ></button>
      {currentCount}
      <button
        className="product-count__btn icon icon--plus"
        onClick={() => {
          console.log(cart);
          addToCart(product);
        }}
      ></button>
    </div>
  );
};
