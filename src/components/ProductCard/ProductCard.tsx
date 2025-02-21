import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import itemSlice from '../../features/product/itemSlice';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const onSelectItem = (item: Product) => {
    dispatch(itemSlice.actions.selectItem(item));
  };

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={product.image} alt="phone" />
      </div>
      <Link
        to={`/products?category=${product.category}&item=${product.name}`}
        onClick={() => onSelectItem(product)}
      >
        <h5>{product?.name}</h5>
      </Link>
      <div className={styles.price}>
        {product.price && <h3>${product.price}</h3>}
        <h3 className={product.price ? styles.discount : ''}>
          ${product.fullPrice}
        </h3>
      </div>
      <span></span>
      <div className={styles.characteristic}>
        <p>Screen</p>
        <h6>{product?.screen}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>Capacity</p>
        <h6>{product?.capacity}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>RAM</p>
        <h6>{product?.ram}</h6>
      </div>
      <AddToCartButton product={product} />
    </div>
  );
};
