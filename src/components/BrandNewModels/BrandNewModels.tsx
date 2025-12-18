import React from 'react';
import products from '../../../public/api/products.json';
import styles from './BrandNewModels.module.scss';
import FavoritesIcon from './favorites_icon.png';

const sortedByYear = [...products]
  .filter(product => product.capacity === '256GB')
  .sort((a, b) => b.year - a.year)
  .splice(0, 11);

export const BrandNewModels:React.FC = () => {
  return (
    <div className={styles.new_models}>
      <div className={styles.new_models__top_bar}>
        <h3>Brand new models</h3>
        <div className={styles.new_models__top_bar__buttons}>
          <button>left</button>
          <button>right</button>
        </div>
      </div>

      <div className={styles.new_models__container}>
        {sortedByYear.map(item => (
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
