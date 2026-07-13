import React from 'react';
import styles from './ProductCard.module.scss';
import { ProductCardActions } from '../ProductCardActions';
import { ProductCardSpecs } from '../ProductCardSpecs';
import { Link } from 'react-router-dom';

type Prop = {
  id: string;
  img: string;
  name: string;
  category: string;
  capacity: string;
  priceRegular: number;
  priceDiscount?: number;
  ram: string;
  screen: string;
};

export const ProductCard: React.FC<Prop> = ({
  id,
  img,
  name,
  category,
  capacity,
  priceRegular,
  priceDiscount,
  ram,
  screen,
}) => {
  const productPath = id ? `/product/${id}` : '/';

  return (
    <Link to={productPath} className={styles['product-card__link']}>
      <div className={styles['product-card']}>
        <img
          src={`/${img}`}
          alt={name}
          className={styles['product-card__image']}
        />

        <h3 className={styles['product-card__title']}>{name}</h3>

        <div className={styles['product-card__content']}>
          <div className={styles['product-card__prices']}>
            {priceDiscount ? (
              <>
                <span className={styles['product-card__price-discount']}>
                  ${priceDiscount}
                </span>
                <span className={styles['product-card__price-regular-strike']}>
                  ${priceRegular}
                </span>
              </>
            ) : (
              <span className={styles['product-card__price-regular']}>
                ${priceRegular}
              </span>
            )}
          </div>

          <div className={styles['product-card__divider']} />
          <ProductCardSpecs screen={screen} capacity={capacity} ram={ram} />
        </div>
        <ProductCardActions
          product={{
            id: id,
            name: name,
            price: priceDiscount ? priceDiscount : priceRegular,
            img: img,
            category: category,
          }}
        />
      </div>
    </Link>
  );
};
