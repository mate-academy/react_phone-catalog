import React from 'react';
import classNames from 'classnames';

import styles from './CartItem.module.scss';
import { DeviceShort } from '../../types/DeviceShort';
import { UseHooks } from '../../AppHooks';

import close from '../../assets/Icons/Close.svg';
import minus from '../../assets/Icons/Minus.svg';
import plus from '../../assets/Icons/Plus.svg';
import { getData } from '../../services';
import { DeviceFull } from '../../types/DeviceFull';

type Props = {
  item: DeviceShort;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ item, quantity }) => {
  const { setCartItems, hotProducts, setCurrentDevice } = UseHooks();

  const minusQuantity = (curItem: DeviceShort) => {
    setCartItems(prevItems => {
      const updated: [DeviceShort, number][] = prevItems.map(
        ([device, count]) => {
          if (device.id === curItem.id && count > 1) {
            return [device, count - 1];
          }

          return [device, count];
        },
      );

      localStorage.setItem('cartItems', JSON.stringify(updated));

      return updated;
    });
  };

  const plusQuantity = (curItem: DeviceShort) => {
    setCartItems(prevItems => {
      const updated: [DeviceShort, number][] = prevItems.map(
        ([device, count]) =>
          device.id === curItem.id ? [device, count + 1] : [device, count],
      );

      localStorage.setItem('cartItems', JSON.stringify(updated));

      return updated;
    });
  };

  const deleteCartItem = () => {
    setCartItems(prev => {
      const updated = prev.filter(prod => prod[0].name !== item.name);

      localStorage.setItem('cartItems', JSON.stringify(updated));

      return updated;
    });
  };

  const curPrice = (product: DeviceShort) => {
    if (hotProducts.includes(product)) {
      return product.price;
    }

    return product.fullPrice;
  };

  const addParams = (device: DeviceShort) => {
    getData<DeviceFull[]>(`${device.category}`).then(data => {
      data.filter(element => {
        if (element.name === device.name) {
          setCurrentDevice(element);
        }
      });
    });
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
          onClick={() => addParams(item)}
        />
        <p
          className={classNames(styles.card__text, 'body-text')}
          onClick={() => addParams(item)}
        >
          {item.name}
        </p>
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
        <h3 className={styles.card__price}>${curPrice(item) * quantity}</h3>
      </div>
    </div>
  );
};
