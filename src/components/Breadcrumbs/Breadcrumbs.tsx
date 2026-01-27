import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { TypesOfProducts } from '../../types/TypesOfProducts';

type Props = {
  product?: TypesOfProducts;
};

export const Breadcrumbs = ({ product }: Props) => {
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);
  const location = useLocation();

  const crumbs = [{ label: 'Home', to: '/' }];

  if (!product) {
    if (location.pathname.startsWith('/phones')) {
      crumbs.push({ label: 'Phones', to: '/phones' });
    }

    if (location.pathname.startsWith('/tablets')) {
      crumbs.push({ label: 'Tablets', to: '/tablets' });
    }

    if (location.pathname.startsWith('/accessories')) {
      crumbs.push({ label: 'Accessories', to: '/accessories' });
    }

    if (location.pathname.startsWith('/favorites')) {
      crumbs.push({ label: 'Favorites', to: '/favorites' });
    }

    if (location.pathname.startsWith('/cart')) {
      crumbs.push({ label: 'Cart', to: '/cart' });
    }
  }

  if (product) {
    crumbs.push({
      label: capitalize(product.category),
      to: `/${product.category}`,
    });

    crumbs.push({
      label: product.name,
      to: location.pathname,
    });
  }

  return (
    <nav className={styles.crumbs}>
      {crumbs.map((crumb, index) => (
        <span key={crumb.to} className={styles.crumbs__item}>
          {index > 0 && (
            <img
              src="../../../public/img/icons/icon-arrow-right.svg"
              alt="Arrow-right"
              className={styles.crumbs__iconRight}
            />
          )}

          {index < crumbs.length - 1 ? (
            <Link to={crumb.to} className={styles.crumbs__link}>
              {crumb.to === '/' ? (
                <img
                  src="../../../public/img/icons/icon-home.svg"
                  alt="Home"
                  className={styles.crumbs__homeIcon}
                />
              ) : (
                crumb.label
              )}
            </Link>
          ) : (
            <span className={styles.crumbs__span}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
