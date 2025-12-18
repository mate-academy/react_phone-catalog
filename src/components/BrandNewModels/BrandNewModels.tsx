import React, { useState } from 'react';
import products from '../../../public/api/products.json';
import styles from './BrandNewModels.module.scss';
import FavoritesIcon from './favorites_icon.png';
import Disabled_left from '../../icons/arrows/Disabled_left.png';
import Disabled_right from '../../icons/arrows/Disabled_right.png';
import Active_left from '../../icons/arrows/Active_left.png';
import Active_right from '../../icons/arrows/Active_right.png';

const sortedByYear = [...products]
  .filter(product => product.capacity === '256GB')
  .sort((a, b) => b.year - a.year)
  .splice(0, 11);

export const BrandNewModels:React.FC = () => {
  const VISIBLE_COUNT = 4;

  const [startIndex, setStartIndex] = useState(0);
  const maxIndex = sortedByYear.length - VISIBLE_COUNT;

  const visibleProducts = sortedByYear.slice(
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
    <div className={styles.new_models}>
      <div className={styles.new_models__top_bar}>
        <h3>Brand new models</h3>
        <div className={styles.new_models__top_bar__buttons}>
          <button
            onClick={handleLeftButton}
            disabled={isLeftDisabled}
            className={styles.new_models__top_bar__buttons__button}
          >
            {isLeftDisabled ? (
              <img src={Disabled_left} alt="Previous products" className={styles.new_models__top_bar__buttons__button__img} />
            ) : (
                <img src={Active_left} alt="Previous products" className={styles.new_models__top_bar__buttons__button__img} />
            )}
          </button>
          <button
            onClick={handleRightButton}
            disabled={isRightDisabled}
            className={styles.new_models__top_bar__buttons__button}
          >
            {isRightDisabled ? (
              <img src={Disabled_right} alt="Next products" className={styles.new_models__top_bar__buttons__button__img} />
            ) : (
                <img src={Active_right} alt="Next products" className={styles.new_models__top_bar__buttons__button__img} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.new_models__container}>
        {visibleProducts.map(item => (
          <div key={item.id} className={styles.new_models__item}>
            <div className={styles.new_models__item__container}>
              <img
                src={item.image}
                alt='Item Main Image'
                className={styles.new_models__item__img}
              />
              <p className={styles.new_models__item__name}>{item.name}</p>
              <h4 className={styles.new_models__item__price}>${item.price}</h4>
              <div className={styles.new_models__item__description}>
                <p className={styles.new_models__item__description__key}>Screen:</p>
                <p className={styles.new_models__item__description__value}>{item.screen}</p>
              </div>
              <div className={styles.new_models__item__description}>
                <p className={styles.new_models__item__description__key}>Capacity:</p>
                <p className={styles.new_models__item__description__value}>{item.capacity}</p>
              </div>
              <div className={styles.new_models__item__description}>
                <p className={styles.new_models__item__description__key}>RAM:</p>
                <p className={styles.new_models__item__description__value}>{item.ram}</p>
              </div>
              <div className={styles.new_models__item__buttons}>
                <button className={styles.new_models__item__buttons__cart}>Add to cart</button>
                <button className={styles.new_models__item__buttons__fav}>
                  <img src={FavoritesIcon} alt='Add to favorites' className={styles.new_models__item__buttons__fav__icon} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
