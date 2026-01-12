import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../api/products';
import { Link } from 'react-router-dom';
import { AddToCartBtn, FavoriteBtn } from '../Buttons';
import { TechSpecs } from '../TechSpecs';
import { getProductImage } from '../../utils/productHelper';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const img = getProductImage(product);
  const linkId = product.itemId || product.id;
  const currentPrice = product.priceDiscount ?? product.price ?? 0;
  const oldPrice = product.priceRegular ?? product.fullPrice ?? 0;
  const hasDiscount = oldPrice > currentPrice;

  const cardSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Capacity', value: product.capacity },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${linkId}`}
        className={styles.productCard__link}
        tabIndex={-1}
      >
        <img
          src={img}
          alt={product.name}
          className={styles.productCard__image}
        />
        <div className={styles.productCard__title}>{product.name}</div>
      </Link>
      <div className={styles.productCard__prices}>
        <h3 className={styles.productCard__price}>${currentPrice || ''}</h3>
        {hasDiscount && (
          <h3 className={styles.productCard__oldPrice}>${oldPrice}</h3>
        )}
      </div>
      <div className={styles.productCard__line} />
      <TechSpecs specs={cardSpecs} type="short" />
      <div className={styles.productCard__actions}>
        <AddToCartBtn product={product} />
        <FavoriteBtn product={product} />
      </div>
    </div>
  );
};
