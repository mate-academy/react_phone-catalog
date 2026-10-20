import type React from 'react';
import type { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import { asset } from '../../../../helper';
import { Link } from 'react-router-dom';
import { AddActions } from '../AddActions';
import { Specifications } from '../Specifications';
import { PRODUCT_SPECIFICATIONS_CARD } from '../../../../constants';
import { Prices } from '../Prices';

type Props = {
  product: Product;
  classname?: string;
};

export const ProductCard: React.FC<Props> = ({ product, classname }) => {
  const { name, images, priceRegular, priceDiscount } = product;

  return (
    <div className={`${styles['product-card']} ${classname}`}>
      <Link to={`/${product.category}/${product.id}`} className={styles.link}>
        <div className={styles['image-wrapper']}>
          <img src={asset(images[0])} alt={name} className={styles.image} />
        </div>

        <h3 className={styles.title}>{name}</h3>
      </Link>

      <Prices priceDiscount={priceDiscount} priceRegular={priceRegular} />

      <div className={styles.divider} />

      <Specifications
        list={PRODUCT_SPECIFICATIONS_CARD}
        product={product}
        classnames={{ specificationsPanel: styles['specifications-panel'] }}
      />

      <AddActions product={product} />
    </div>
  );
};
