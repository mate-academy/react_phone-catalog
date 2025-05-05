import React from 'react';
import classNames from 'classnames';

import styles from './ProductCardBig.module.scss';
import '../../styles/_typography.scss';
import '../../styles/utils/_mixins.scss';

import fav from '../../assets/Icons/Favourites.svg';
import favFilled from '../../assets/Icons/Favourites-filled.svg';

import { UseHooks } from '../../AppHooks';
import { DeviceShort } from '../../types/DeviceShort';
import { getData } from '../../services';
import { DeviceFull } from '../../types/DeviceFull';

interface Props {
  item: DeviceShort;
}

export const ProductCardBig: React.FC<Props> = ({ item }) => {
  const {
    hotProducts,
    favourites,
    setFavourites,
    cartItems,
    setCartItems,
    setCurrentDevice,
  } = UseHooks();
  const itemWithDiscount = hotProducts.some(
    product => product.name.toLowerCase() === item.name.toLowerCase(),
  );

  const chooseHeart = () => {
    if (favourites.some(device => device.id === item.id)) {
      return favFilled;
    }

    return fav;
  };

  const handleFavourite = () => {
    if (favourites.some(device => device.id === item.id)) {
      setFavourites(prev => prev.filter(device => device.name !== item.name));
    } else {
      setFavourites(prev => [...prev, item]);
    }
  };

  const handleCart = () => {
    if (!cartItems.some(([device]) => device.id === item.id)) {
      setCartItems(prev => [...prev, [item, 1]]);
    }
  };

  const itemAddedToCart = cartItems.some(([device]) => device.id === item.id);

  const addParams = (device: DeviceShort) => {
    getData<DeviceFull[]>(`${device.category}`).then(data =>
      data.filter(element => {
        if (element.name === device.name) {
          setCurrentDevice(element);
        }
      }),
    );
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__imageContainer}>
          <img
            className={styles.card__image}
            src={item.image}
            alt="phone"
            onClick={() => addParams(item)}
          />
        </div>
        <div className={styles.card__description}>
          <p
            className={classNames(styles.card__name, 'body-text')}
            onClick={() => addParams(item)}
          >
            {item.name}
          </p>
          <div
            className={classNames(styles.card__discountPrice, {
              hidden: !itemWithDiscount,
            })}
          >
            <h3 className={styles.card__price}>{`$${item.price}`}</h3>
            <h3 className={styles.card__oldPrice}>{`$${item.fullPrice}`}</h3>
          </div>
          <h3
            className={classNames(styles.card__price, {
              hidden: itemWithDiscount,
            })}
          >{`$${item.fullPrice}`}</h3>
          <div className={styles.card__divider}></div>
          <div className={styles.card__params}>
            <div className={styles.card__row}>
              <p className={classNames(styles.card__param, 'small-text')}>
                Screen
              </p>
              <p className={classNames(styles.card__value, 'small-text')}>
                {item.screen}
              </p>
            </div>
            <div className={styles.card__row}>
              <p className={classNames(styles.card__param, 'small-text')}>
                RAM
              </p>
              <p className={classNames(styles.card__value, 'small-text')}>
                {item.ram}
              </p>
            </div>
            <div className={styles.card__row}>
              <p className={classNames(styles.card__param, 'small-text')}>
                Capacity
              </p>
              <p className={classNames(styles.card__value, 'small-text')}>
                {item.capacity}
              </p>
            </div>
          </div>
          <div className={styles.card__buttons}>
            <button
              className={classNames(
                styles.card__buttonAdd,
                {
                  [styles['card__buttonAdd--added']]: itemAddedToCart,
                },
                'small-text',
              )}
              onClick={handleCart}
            >
              {itemAddedToCart ? 'Added to cart' : 'Add to Cart'}
            </button>
            <button
              className={classNames(styles.card__buttonFav)}
              onClick={handleFavourite}
            >
              <img className={styles.card__fav} src={chooseHeart()} alt="fav" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
