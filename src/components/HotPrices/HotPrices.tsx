import React, { useState } from 'react';
import products from '../../../public/api/products.json';
import styles from './HotPrices.module.scss';
import FavoritesIcon from '../../icons/favorites_icon.png';
import Disabled_left from '../../icons/arrows/Disabled_left.png';
import Disabled_right from '../../icons/arrows/Disabled_right.png';
import Active_left from '../../icons/arrows/Active_left.png';
import Active_right from '../../icons/arrows/Active_right.png';

const sortedByPrice = [...products]
  .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
  .splice(0, 11);

export const HotPrices: React.FC = () => {
  const VISIBLE_COUNT = 4;

  const [startIndex, setStartIndex] = useState(0);
  const maxIndex = sortedByPrice.length - VISIBLE_COUNT;

  const visibleProducts = sortedByPrice.slice(
    startIndex,
    startIndex + VISIBLE_COUNT,
  );

  const handleLeftButton = () => {
    setStartIndex(prev => prev - 1);
  };

  const handleRightButton = () => {
    setStartIndex(prev => prev + 1);
  };

  const isLeftDisabled = startIndex === 0;
  const isRightDisabled = startIndex === maxIndex;

  return (
    <div className={styles.hot_prices}>
      <div className={styles.hot_prices__top_bar}>
        <h3>Hot prices</h3>
        <div className={styles.hot_prices__top_bar__buttons}>
          <button
            onClick={handleLeftButton}
            disabled={isLeftDisabled}
            className={styles.hot_prices__top_bar__buttons__button}
          >
            {isLeftDisabled ? (
              <img src={Disabled_left} alt="Previous products" className={styles.hot_prices__top_bar__buttons__button__img} />
            ) : (
                <img src={Active_left} alt="Previous products" className={styles.hot_prices__top_bar__buttons__button__img} />
            )}
          </button>
          <button
            onClick={handleRightButton}
            disabled={isRightDisabled}
            className={styles.hot_prices__top_bar__buttons__button}
          >
            {isRightDisabled ? (
              <img src={Disabled_right} alt="Next products" className={styles.hot_prices__top_bar__buttons__button__img} />
            ) : (
                <img src={Active_right} alt="Next products" className={styles.hot_prices__top_bar__buttons__button__img} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.hot_prices__container}>
        {visibleProducts.map(item => (
          <div key={item.id} className={styles.hot_prices__item}>
            <div className={styles.hot_prices__item__container}>
              <img
                src={item.image}
                alt='Item Main Image'
                className={styles.hot_prices__item__img}
              />
              <p className={styles.hot_prices__item__name}>{item.name}</p>
              <div className={styles.hot_prices__item__price__container}>
                <h4 className={styles.hot_prices__item__price__container__main_price}>${item.price}</h4>
                <p className={styles.hot_prices__item__price__container__full_price}>${item.fullPrice}</p>
              </div>
              <div className={styles.hot_prices__item__description}>
                <p className={styles.hot_prices__item__description__key}>Screen:</p>
                <p className={styles.hot_prices__item__description__value}>{item.screen}</p>
              </div>
              <div className={styles.hot_prices__item__description}>
                <p className={styles.hot_prices__item__description__key}>Capacity:</p>
                <p className={styles.hot_prices__item__description__value}>{item.capacity}</p>
              </div>
              <div className={styles.hot_prices__item__description}>
                <p className={styles.hot_prices__item__description__key}>RAM:</p>
                <p className={styles.hot_prices__item__description__value}>{item.ram}</p>
              </div>
              <div className={styles.hot_prices__item__buttons}>
                <button className={styles.hot_prices__item__buttons__cart}>Add to cart</button>
                <button className={styles.hot_prices__item__buttons__fav}>
                  <img src={FavoritesIcon} alt='Add to favorites' className={styles.hot_prices__item__buttons__fav__icon} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
