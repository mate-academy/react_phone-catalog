import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';
import { getFormattedPathname } from '../../modules/shared/utils/getFormattedPathname';
import { useAppContext } from '../../contexts/AppContext';
import { Arrow } from '../Arrow/Arrow';

export const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const { products, theme } = useAppContext();

  return (
    <div
      className={styles.path}
    >
      <Link className={styles.home} to='/'>
        <img
          src={`/img/icons/${theme}-theme/Home.svg`}
          alt="Home"
        />
      </Link>

      {getFormattedPathname(pathname).map((item, i, arr) => [
        <Arrow direction='right' isDisabled={true} />,
        <Link
          key={`link-${i}`}
          to={`/${i === 0 ? item : `${pathname.slice(1)}`}`}
          className={`
            ${i === 0 && arr.length > 1 ? styles.firstItem : ''}
            ${i !== 0 ? styles.lastItem : ''}
            ${styles.pageName} smallText`}>
          {i === 0 ? item : products.find(product => product.itemId === item)?.name}
        </Link>
      ])}
    </div>
  );
};
