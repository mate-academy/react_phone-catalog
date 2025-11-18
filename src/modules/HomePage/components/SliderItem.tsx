import { Product } from '@/types';
import React from 'react';
import styles from './SliderComponent.module.scss';
type SliderItemProps = {
  item: Product;
  showDiscount: boolean;
};

const SliderItem: React.FC<SliderItemProps> = ({ item, showDiscount }) => {
  return (
    <div className={styles.SliderComponent__item}>
      <div className={styles.SliderComponent__item__imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.SliderComponent__item__infoContainer}>
        <span className={styles.SliderComponent__item__itemName}>
          {item.name}
        </span>
        <div className={styles.SliderComponent__item__priceContainer}>
          <div className={styles.SliderComponent__item__fullPrice}>
            ${item.fullPrice}
          </div>
          {showDiscount && (
            <div className={styles.SliderComponent__item__price}>
              ${item.price}
            </div>
          )}
        </div>
        <div className={styles.SliderComponent__item__divider}></div>
        <div className={styles.SliderComponent__item__specContainer}>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Screen
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.screen}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Capacity
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.capacity}{' '}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>RAM</span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.ram}{' '}
            </span>
          </div>
        </div>
        <div className={styles.SliderComponent__item__buttonContainer}>
          <button className={styles.SliderComponent__item__cartButton}>
            Add to Cart
          </button>
          <button className={styles.SliderComponent__item__favoriteButton}>
            <img src="img/icons/heart.svg" alt="Add to Favorites" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
