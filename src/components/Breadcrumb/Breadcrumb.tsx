import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';
import { getFormattedPathname } from '../../modules/shared/utils/formatPathname';

export const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();

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

      {getFormattedPathname(pathname).map((item, i, arr) => [
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
            ${i === 0 && arr.length > 1 ? styles.firstItem : ''}
            ${i !== 0 ? styles.lastItem : ''}
            ${styles.pageName} smallText`}>
          {item}
        </Link>
      ])}
    </div>
  );
};
