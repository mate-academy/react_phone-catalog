import { Link, matchPath, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getRouteByCategory } from '../../services/product';
import styles from './ProductItem.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProductActions } from '../ProductActions';
import { RoutePath } from '../../types/RoutePath';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isDiscoutVisible = matchPath(
    { path: RoutePath.Home, end: true },
    pathname,
  );

  return (
    <article className={styles.card} aria-label={`Product:${product.name}`}>
      <Link
        aria-label={`Visit product:${product.name}`}
        to={`${getRouteByCategory(product.category)}/${product.itemId}`}
      >
        <header className={styles.card__header}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.card__image}
          />

          <h3 className={styles.card__title}>{product.name}</h3>
        </header>
      </Link>

      <div className={styles['card__price-wrapper']}>
        <div
          className={classNames(styles.card__price, styles['card__price--new'])}
        >
          ${product.price}
        </div>
        {product.fullPrice > product.price && !isDiscoutVisible && (
          <div
            className={classNames(
              styles.card__price,
              styles['card__price--old'],
            )}
          >
            ${product.fullPrice}
          </div>
        )}
      </div>

      <div className={styles.card__seperator}></div>

      <dl className={styles.card__specs}>
        <div className={styles['card__specs-item']}>
          <dt className={styles['card__specs-option']}>{t('screen')}</dt>
          <dd className={styles['card__specs-data']}>{product.screen}</dd>
        </div>
        <div className={styles['card__specs-item']}>
          <dt className={styles['card__specs-option']}>{t('capacity')}</dt>
          <dd className={styles['card__specs-data']}>{product.capacity}</dd>
        </div>
        <div className={styles['card__specs-item']}>
          <dt className={styles['card__specs-option']}>RAM</dt>
          <dd className={styles['card__specs-data']}>{product.ram}</dd>
        </div>
      </dl>

      <ProductActions itemId={product.itemId} category={product.category} />
    </article>
  );
};
