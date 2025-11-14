import { Product } from '@/types';
import React from 'react';
import styles from './SliderComponent.module.scss';
type SliderItemProps = {
  item: Product;
  showDiscount?: boolean;
};

const SliderItem: React.FC<SliderItemProps> = ({
  item,
  showDiscount = false,
}) => {
  return (
    <div className={styles.SliderComponent__item}>
      <div className={styles.SliderComponent__item__imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.SliderComponent__item__infoContainer}>
        <span className={styles.SliderComponent__itemName}>{item.name}</span>
        <div className={styles.SliderComponent__priceContainer}>
          <h3 className={styles.SliderComponent__item__fullPrice}>
            ${item.fullPrice}
          </h3>
          {showDiscount && (
            <h3 className={styles.SliderComponent__item__price}>
              ${item.price}
            </h3>
          )}
        </div>
        <div className={styles.SliderComponent__item__divider}></div>
        <div className={styles.SliderComponent__item__specContainer}>
          <div>
            <span>Screen</span>
            <span>{item.screen}</span>
          </div>
          <div>
            <span>Capacity</span>
            <span>{item.capacity} </span>
          </div>
          <div>
            <span>RAM</span>
            <span>{item.ram} </span>
          </div>
        </div>
        <div className={styles.SliderComponent__item__buttonContainer}>
          <button className={styles.SliderComponent__item__cartButton}>
            Add to Cart
          </button>
          <button className={styles.SliderComponent__item__favoriteButton}>
            <img src="/img/icons/heart.svg" alt="Add to Favorites" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
