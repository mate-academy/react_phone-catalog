import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import {  useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
  discount: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const { capacity, fullPrice, name, price, ram, screen, itemId, category } =
    product;
  const navigate = useNavigate();

  const handleClick = () => {
    const newId = itemId.split('-').slice(0, -2).join('-');
    const newUrl = `/${category}/${newId}`

    return navigate(newUrl);
  };



  return (
    <div className={styles['productCard']}>
      <img
        className={styles['productCard__picture']}
        src={`./${product.image}`}
        onClick={handleClick}
      />
      <p className={styles['productCard__product_name']} onClick={handleClick}>
        {name}
      </p>

      {discount ? (
        <>
          <div className={styles['productCard__container']}>
            <span className={styles['productCard__container__price']}>
              ${price}
            </span>
            <span className={styles['productCard__container__price__reduce']}>
              ${fullPrice}
            </span>
          </div>
        </>
      ) : (
        <div className={styles['productCard__container']}>
          <span className={styles['productCard__container__price']}>
            ${fullPrice}
          </span>
          <span
            className={styles['productCard__container__price__empty']}
          ></span>
        </div>
      )}

      <div className={styles['productCard__separator']}></div>

      <div className={styles['productCard__description']}>
        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            Screen
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {screen}
          </span>
        </p>

        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            Capacity
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {capacity}
          </span>
        </p>

        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            RAM
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {ram}
          </span>
        </p>
      </div>

      <div className={styles['productCard__buttons']}>
        <div className={styles['productCard__buttons__add']}>Add to cart</div>
        <div className={styles['productCard__buttons__fav']}></div>
      </div>
    </div>
  );
};
