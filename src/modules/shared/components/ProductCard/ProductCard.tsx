import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import styles from './ProductCard.module.scss';

import { Product } from '@/types/Product';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '../Button';

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: FC<Props> = React.memo(function ProductCard({
  product,
  className,
}) {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const [isSelected, setIsSelected] = useState(false);

  const toggleFavorites = () => {
    setIsSelected(curState => !curState);
  };

  return (
    <article className={classNames(styles.productCard, className)}>
      <div className={styles.productPreviewWrapper}>
        <img src={image} alt={name} />
      </div>

      <h3 className={styles.productTitle}>
        <Link
          to={`/product/${itemId}`}
          state={{ category }}
          className={styles.productLink}
        >
          {name}
        </Link>
      </h3>

      <div className={styles.productPrices}>
        <strong className={styles.productCurPrice}>
          ${price ?? fullPrice}
        </strong>

        {price && <span className={styles.productOldPrice}>${fullPrice}</span>}
      </div>
      <dl className={styles.productSpecs}>
        <div className={styles.productSpecRow}>
          <dt className={styles.productSpecOption}>Screen</dt>
          <dd className={styles.productSpecValue}>{screen}</dd>
        </div>
        <div className={styles.productSpecRow}>
          <dt className={styles.productSpecOption}>
            {category === 'accessories' ? 'Size' : 'Capacity'}
          </dt>
          <dd className={styles.productSpecValue}>{capacity}</dd>
        </div>
        <div className={styles.productSpecRow}>
          <dt className={styles.productSpecOption}>RAM</dt>
          <dd className={styles.productSpecValue}>{ram}</dd>
        </div>
      </dl>
      <div className={styles.productActions}>
        <Button variant="primary" className={styles.cartBtn}>
          Add to cart
        </Button>

        <Button
          variant="outline"
          isIconOnly
          size="large"
          isSelected={isSelected}
          radius="50%"
          onClick={toggleFavorites}
          className={styles.likeBtn}
        >
          {isSelected ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </Button>
      </div>
    </article>
  );
});
