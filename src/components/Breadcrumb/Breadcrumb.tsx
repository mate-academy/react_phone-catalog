import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';
import { findProduct } from '../../modules/shared/services/productService';
import { useAppContext } from '../../contexts/AppContext';

export const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const {generateProductCode} = useAppContext();

  function formatPathname(pathname: string) {
    const path = pathname.split('/').filter(item => item !== '');

    if (path.length > 1) {
      const product = findProduct('itemId', path[1]);
      path[1] = product ? generateProductCode(product.name) : path[1];
    }
    return path;
  }

  return (
    <div 
      className={styles.path}
    >
      <Link className={styles.home} to='/'>
        <img
          src="/img/icons/Home.svg"
          alt="Home"
        />
      </Link>

      {formatPathname(pathname).map((item, i) => [
        <img
          key={`arrow-${i}`}
          className={styles.arrow}
          src="/img/icons/arrow-disabled.svg"
          alt="Arrow"
        />,
        <Link
          key={`link-${i}`}
          to={`/${i === 0 ? item : `${pathname.slice(1)}`}`}
          className={`
            ${i !== 0 && styles.lastItem}
            ${styles.pageName} smallText`}>
          {item}
        </Link>
      ])}
    </div>
  );
};
