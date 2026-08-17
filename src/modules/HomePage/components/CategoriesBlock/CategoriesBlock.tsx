import styles from './CategoriesBlock.module.scss';
import { Link } from 'react-router-dom';

import phonesCategorie from '../../../../assets/images/phones-categories.png';
import tabletsCategorie from '../../../../assets/images/tablets-categories.png';
// eslint-disable-next-line max-len
import accessoriesCategorie from '../../../../assets/images/accessories-categories.png';

interface Props {
  phonesCount: number;
  tabletCount: number;
  accessoriesCount: number;
}

export const CategoriesBlock = ({
  phonesCount,
  tabletCount,
  accessoriesCount,
}: Props) => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__wrapper}>
        <Link to="/phones" className={styles.categorie__link}>
          <div className={styles.categorie__imageWrapper}>
            <img
              src={phonesCategorie}
              alt="Mobile phones category"
              className={styles.categorie__image}
            />
          </div>
          <h3 className={styles.categorie__title}>Mobile phones</h3>
          <span className={styles.categorie__count}>{phonesCount} models</span>
        </Link>

        <Link to="/tablets" className={styles.categorie__link}>
          <div className={styles.categorie__imageWrapper}>
            <img
              src={tabletsCategorie}
              alt="Tablets category"
              className={styles.categorie__image}
            />
          </div>
          <h3 className={styles.categorie__title}>Tablets</h3>
          <span className={styles.categorie__count}>{tabletCount} models</span>
        </Link>

        <Link to="/accessories" className={styles.categorie__link}>
          <div className={styles.categorie__imageWrapper}>
            <img
              src={accessoriesCategorie}
              alt="Accessories category"
              className={styles.categorie__image}
            />
          </div>
          <h3 className={styles.categorie__title}>Accessories</h3>
          <span className={styles.categorie__count}>
            {accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
