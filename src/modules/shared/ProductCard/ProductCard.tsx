import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ProductGeneral } from '../../../types/ProductGeneral';
import styles from './ProductCard.module.scss';
import { Price } from '../Price';
import { ProductButtons } from '../ProductButtons';
import { ProductDetails } from '../ProductDetails';

type Props = {
  good: ProductGeneral;
  style?: { [key: string]: string };
  otherClassName?: string;
  isFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  good,
  style,
  otherClassName,
  isFullPrice = true,
}) => {
  const {
    itemId,
    name,
    image,
    price,
    screen,
    capacity,
    ram,
    fullPrice,
    category,
  } = good;
  const navigate = useNavigate();

  return (
    <div
      className={classNames(styles.card, otherClassName)}
      style={style}
      onClick={() => navigate(`/${category}/${itemId}`)}
    >
      <div className={styles.card__content}>
        <img src={image} alt={name} className={styles.card__img} />

        <div className={styles.card__mainInfo}>
          <p className={styles.card__title}>{name}</p>

          <Price
            price={price}
            fullPrice={isFullPrice ? fullPrice : undefined}
          />
        </div>

        <ProductDetails
          values={{ screen, capacity, ram }}
          otherClass={styles.card__secondaryInfo}
        />

        <ProductButtons productId={good.itemId} />
      </div>
    </div>
  );
};
