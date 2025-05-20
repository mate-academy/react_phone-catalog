import { Link, useLocation } from 'react-router-dom';
import { ArrowIconRight } from '../../icons/ArrowIcon/ArrowIcon';
import { capitalize } from '../CategoryPage/CategoryPage';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs: React.FC = () => {
  const location = useLocation()
    .pathname.split('/')
    .filter(p => p !== '');

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <img
          className={styles.breadcrumbs__icon}
          src="public/img/icons/Home.svg"
          alt="Home Icon"
        />
      </Link>
      <ArrowIconRight />
      {location.length > 1 ? (
        <>
          <Link to={`/${location[0]}`} className={styles.breadcrumbs__link}>
            {capitalize(location[0])}
          </Link>
          <ArrowIconRight />
          <p className={styles.breadcrumbs__title}>{capitalize(location[1])}</p>
        </>
      ) : (
        <p className={styles.breadcrumbs__title}>{capitalize(location[0])}</p>
      )}
    </div>
  );
};

export default Breadcrumbs;
