import React from 'react';
import styles from './ProductItem.module.scss';
import { Price } from '../Price';
import { Details } from '../Details';
import { Product } from '../../../types/productTypes';
import { Link } from 'react-router-dom';
import { ProductsFooterItem } from './components/ProductsFooterItem';

type ItemProps = {
  isHot?: boolean;
  item: Product;
};

export const ProductItem = ({ isHot = false, item }: ItemProps) => {
  const { itemId, fullPrice, image, category } = item;

  return (
    <div className={styles.productSlider}>
      <Link
        to={`/product/${itemId}`}
        state={{ category }}
        className={styles.linkWrapper}
      >
        <img className={styles.productSlider__image} src={image} />
      </Link>
      <Link
        to={`/product/${itemId}`}
        state={{ category }}
        className={styles.productSlider__title}
      >
        {item.name}
      </Link>

      <Price isHot={isHot} price={fullPrice} oldPrice={fullPrice} />
      <div className={styles.productSlider__verticalLine}></div>
      {item && <Details item={item} />}
      <ProductsFooterItem item={item} />
    </div>
  );
};
