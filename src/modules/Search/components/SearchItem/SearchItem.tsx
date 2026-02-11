import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  product: Pick<Product, 'itemId' | 'name' | 'image' | 'fullPrice' | 'price'>;
}

export const SearchItem: FC<Props> = ({ product }) => {
  const { image, name, itemId, fullPrice, price } = product;

  const productPrice = price || fullPrice;
  const productLink = `/product/${itemId}`;

  return (
    <Link to={productLink} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={`${image}`} alt={name} />
      </div>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.price}>
        <strong>${productPrice}</strong>
      </p>
    </Link>
  );
};
