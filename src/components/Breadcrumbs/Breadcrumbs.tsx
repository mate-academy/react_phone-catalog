import homeIcon from '../../../public/img/icons/HomeIcon.png';
import arrowRight from '../../../public/img/icons/arrowRight.png';
import { Link } from 'react-router-dom';
import styles from './Breadcrumps.module.scss';

type Props = {
  category?: string;
  productName?: string;
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const Breadcrumbs = ({ category, productName }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to={'/'}>
        <img className={styles.breadcrumbs__home} src={homeIcon} alt="home" />
        <img className={styles.breadcrumbs__arrow} src={arrowRight} alt=">" />
      </Link>

      {category && (
        <>
          <Link
            to={`/${category}`}
            className={`${styles.breadcrumbs__link} ${productName ? '' : styles['breadcrumbs__link--active']}`}
          >
            {capitalize(category)}
          </Link>
        </>
      )}

      {productName && (
        <>
          <img className={styles.breadcrumbs__arrow} src={arrowRight} alt=">" />
          <span
            className={`${styles.breadcrumbs__link} ${styles['breadcrumbs__link--active']}`}
          >
            {capitalize(productName)}
          </span>
        </>
      )}
    </div>
  );
};
