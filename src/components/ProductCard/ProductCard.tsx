import React, { useMemo } from 'react';

import styles from './ProductCard.module.scss';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import { ProductCardType } from '../../types/ProductCardType';
import { ActionBlock } from '../ActionBlock';

type Props = {
  product: ProductInfo;
  type: ProductCardType;
  cardWidth: number | string;
};

export const ProductCard: React.FC<Props> = ({ product, type, cardWidth }) => {
  const {
    category,
    id,
    namespaceId,
    name,
    capacity,
    priceRegular,
    priceDiscount,
    images,
    screen,
    ram,
  } = product;

  const cardStyles = useMemo(
    () => ({
      width: `${cardWidth}px`,
    }),
    [cardWidth],
  );

  return (
    <div className={styles.productCard} style={cardStyles}>
      <Link to={`/${category}/${id}`} className={styles.productCardLink}>
        <div className={styles.productImgContainer}>
          <img
            src={images[0]}
            alt={namespaceId}
            className={styles.productImg}
          />
        </div>

        <p className={styles.productName}>{name}</p>
        {type === 'Hot prices' ? (
          <div className={styles.productPriceWrap}>
            <p className={styles.productPrice}>{`$${priceDiscount}`}</p>
            <p className={cn(styles.productPriceDisc, styles.productPrice)}>
              {`$${priceRegular}`}
            </p>
          </div>
        ) : (
          <p className={styles.productPrice}>{`$${priceRegular}`}</p>
        )}
        <div className={styles.divider}></div>
        <div className={cn(styles.productInfo, styles.paddingTop)}>
          <p className={styles.productTechChar}>Screen</p>
          <p className={styles.productTechValue}>{screen.slice(0, 17)}</p>
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productTechChar}>Capacity</p>
          <p className={styles.productTechValue}>{capacity}</p>
        </div>
        <div className={cn(styles.productInfo, styles.paddingBottom)}>
          <p className={styles.productTechChar}>RAM</p>
          <p className={styles.productTechValue}>{ram}</p>
        </div>
      </Link>

      <ActionBlock product={product} />
    </div>
  );
};
