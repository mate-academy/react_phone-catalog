import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  title?: string;
  productName?: string;
};
export const Breadcrumbs: React.FC<Props> = ({ title, productName }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles['breadcrumbs__home-link']}>
        <img src={`${import.meta.env.BASE_URL}/icons/home.png`} alt="" />
      </Link>
      {title && (
        <>
          <span>{' > '}</span>

          <Link
            to={`/${title}`}
            className={`${styles.breadcrumbs__link} ${
              productName ? styles['breadcrumbs__link--active'] : ''
            }`}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span>{' > '}</span>

          <span className={styles['breadcrumbs__product-name']}>
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
