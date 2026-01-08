import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import styles from './ProductCard.module.scss';

import { Product } from '@/types/Product';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '../Button';
import { useFavourites } from '@/hooks/useFavourites';
import { useCart } from '@/hooks/useCart';

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: FC<Props> = React.memo(function ProductCard({
  product,
  className,
}) {
  const {
    id,
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
  const { isFavourite, toggleFavourite } = useFavourites();
  const { toggleToCart, inCart } = useCart();

  const productLink = `/product/${itemId}`;

  const isInFavourite = isFavourite(id);

  const isInCart = inCart(id);

  return (
    <article className={classNames(styles.productCard, className)}>
      <Link className={styles.productPreviewWrapper} to={productLink}>
        <img src={image} alt={name} />
      </Link>

      <Link
        to={productLink}
        state={{ category }}
        className={styles.productLink}
      >
        <h3 className={styles.productTitle}>{name}</h3>
      </Link>

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
        <Button
          variant="primary"
          className={styles.cartBtn}
          isSelected={isInCart}
          size="medium"
          onClick={() => toggleToCart(product)}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>

        <Button
          variant="outline"
          size="medium"
          isSelected={isInFavourite}
          onClick={() => toggleFavourite(product)}
          className={styles.likeBtn}
          squareBtn
          startIcon={
            isInFavourite ? <FaHeart size={16} /> : <FaRegHeart size={16} />
          }
        />
      </div>
    </article>
  );
});
