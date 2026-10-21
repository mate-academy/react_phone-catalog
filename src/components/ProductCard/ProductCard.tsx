import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductActions } from '../ProductActions';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  isNew?: boolean;
};

export const ProductCard = ({ product, isNew }: Props) => {
  const { pathname } = useLocation();
  const isOnDetails = pathname.startsWith('/product/');
  const productUrl = `/product/${product.itemId}`;
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Capacity', value: product.capacity },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles['product-card']} data-cy="ProductCard">
      <Link
        to={productUrl}
        replace={isOnDetails}
        className={styles['product-card__image-link']}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles['product-card__image']}
        />
      </Link>

      <Link
        to={productUrl}
        replace={isOnDetails}
        className={styles['product-card__title']}
      >
        {product.name}
      </Link>

      <div className={styles['product-card__prices']}>
        <span className={styles['product-card__price']}>${product.price}</span>
        {!isNew && product.fullPrice > product.price && (
          <span className={styles['product-card__full-price']}>
            ${product.fullPrice}
          </span>
        )}
      </div>

      <div className={styles['product-card__divider']} />

      <div className={styles['product-card__specs']}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles['product-card__spec']}>
            <span className={styles['product-card__spec-name']}>{label}</span>
            <span className={styles['product-card__spec-value']}>{value}</span>
          </div>
        ))}
      </div>

      <ProductActions product={product} />
    </div>
  );
};
