/* eslint-disable max-len */
import React, { useContext } from 'react';

import { CartContext } from '../../../../context/CartContext';
import { MainContext } from '../../../../context/MainContext';
import styles from './CartItems.module.scss';
import { Delete } from './components/Delete';
import { LinkZone } from './components/LinkZone';
import { Price } from './components/Price';
import { Quantity } from './components/Quantity';

export const CartItems: React.FC = () => {
  const { modelOnClickHandler: moveToDetails } = useContext(MainContext);
  const { cart } = useContext(CartContext);
  const cartItems = Object.values(cart);
  const cartKeys = Object.keys(cart);

  return (
    <div className={styles['cart-items']}>
      {cartItems.map((item, index) => {
        const { title, image, category, counter, fullPrice } = item;
        const id = cartKeys[index];

        const onClickHandler = () => {
          moveToDetails(category, id);
        };

        return (
          <div className={styles.item} key={`${id}-${index}`}>
            <Delete id={id} />
            <LinkZone
              onClickHandler={onClickHandler}
              title={title}
              image={image}
            />
            <Quantity counter={counter} id={id} />
            <Price price={fullPrice} />
          </div>
        );
      })}
    </div>
  );
};
