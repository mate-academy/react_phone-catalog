import React, { useContext } from 'react';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { CatalogContext } from '../../CatalogContext';
import classNames from 'classnames';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const AddToCartBtn: React.FC<Props> = ({ product }) => {
  const { cart, addToCart } = useContext(CatalogContext);
  const isSelected = cart.find(item => item.id === product.id);

  return (
    <button
      className={classNames('add-to-cart-btn', {
        _selected: isSelected,
      })}
      onClick={() => {
        if (isSelected) {
          return;
        }

        addToCart(product);
      }}
    >
      Add{isSelected && 'ed'} to cart
    </button>
  );
};
