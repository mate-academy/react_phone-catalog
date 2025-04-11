import React from 'react';
import classNames from 'classnames';

import styles from './CartItem.module.scss';
import { DeviceShort } from '../../types/DeviceShort';
import { UseHooks } from '../../AppHooks';

import close from '../../assets/Icons/Close.svg';
import minus from '../../assets/Icons/Minus.svg';
import plus from '../../assets/Icons/Plus.svg';

type Props = {
  item: DeviceShort;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ item, quantity }) => {
  const { setCartItems, hotProducts } = UseHooks();

  const minusQuantity = (curItem: DeviceShort) => {
    if (quantity > 1) {
      setCartItems(prevItems =>
        prevItems.map(([device, count]) =>
          device.id === curItem.id ? [device, count - 1] : [device, count],
        ),
      );
    }
  };

  const plusQuantity = (curItem: DeviceShort) => {
    setCartItems(prevItems =>
      prevItems.map(([device, count]) =>
        device.id === curItem.id ? [device, count + 1] : [device, count],
      ),
    );
  };

  const deleteCartItem = () => {
    setCartItems(prev => prev.filter(prod => prod[0].name !== item.name));
  };

  const curPrice = (product: DeviceShort) => {
    if (hotProducts.includes(product)) {
      return product.price;
    }

    return product.fullPrice;
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__part1}>
        <img
          className={styles.card__close}
          src={close}
          onClick={deleteCartItem}
          alt="close"
        />
        <img
          className={styles.card__image}
          src={item.image}
          alt="devicePhoto"
        />
        <p className={(styles.card__text, 'body-text')}>{item.name}</p>
      </div>
      <div className={styles.card__part2}>
        <div className={styles.card__block}>
          <img
            className={classNames(styles.card__button)}
            src={minus}
            alt="minus"
            onClick={() => minusQuantity(item)}
          />
          <p className={(styles.card__quantity, 'body-text')}>{quantity}</p>
          <img
            className={classNames(styles.card__button)}
            src={plus}
            alt="plus"
            onClick={() => plusQuantity(item)}
          />
        </div>
        <h3>${curPrice(item) * quantity}</h3>
      </div>
    </div>
  );
};
