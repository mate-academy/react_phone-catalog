import styles from '../HomePageCategories/HomePageCategories.module.scss';
import { Link } from 'react-router-dom';

import phones from '../../../shared/icons/MainPage/phones.png';
import tablets from '../../../shared/icons/MainPage/tablets.png';
import accessories from '../../../shared/icons/MainPage/accessories.png';
import { Product } from '../../../shared/types/Product';

type Props = {
  products: Product[];
};

export const HomePageCategories: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length ?? 0;
  const tabletsCount =
    products.filter(p => p.category === 'tablets').length ?? 0;
  const accessoriesCount =
    products.filter(p => p.category === 'accessories').length ?? 0;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <Link to="/phones" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={phones} className={styles.image} />
          </div>

          <h3 className={styles.cardTitle}>Mobile phones</h3>
          <p className={styles.count}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={tablets} className={styles.image} />
          </div>

          <h3 className={styles.cardTitle}>Tablets</h3>
          <p className={styles.count}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={accessories} className={styles.image} />
          </div>

          <h3 className={styles.cardTitle}>Accessories</h3>
          <p className={styles.count}>{accessoriesCount} models</p>
        </Link>
      </div>
    </div>
  );
};
