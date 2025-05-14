import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { useAppSelector } from '../../../../hooks/hooks';

interface Crumb {
  displayName: string;
  route: string;
  isLast: boolean;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const products: Product[] = useAppSelector(state => state.products);

  const crumbs: Crumb[] = pathSegments.map((segment, index, array) => {
    const isLast = index === array.length - 1;
    const route = `/${array.slice(0, index + 1).join('/')}`;

    let displayName = segment;

    if (isLast) {
      const currentProduct = products.find(
        (product: Product) => product.itemId === segment,
      );

      if (currentProduct) {
        displayName = currentProduct.name;
      }
    }

    if (displayName) {
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }

    return {
      displayName: displayName,
      route: route,
      isLast: isLast,
    };
  });

  return (
    <div className={styles.breadcrumbs}>
      <Link
        to="/"
        className={classNames(
          styles.breadcrumbs__item,
          styles.breadcrumbs__link,
        )}
      >
        <img
          src="./icons/Home.svg"
          alt="Home icon"
          className={styles.breadcrumbs__image}
        />
      </Link>

      {crumbs.map((crumb, index) => (
        <div key={index} className={classNames(styles.breadcrumbs__item)}>
          <img src="./icons/arrow-right.svg" />

          {!crumb.isLast ? (
            <Link to={crumb.route} className={styles.breadcrumbs__link}>
              {crumb.displayName}
            </Link>
          ) : (
            <span
              className={classNames(
                styles.breadcrumbs__link,
                styles['breadcrumbs__link--last'],
              )}
            >
              {crumb.displayName}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
