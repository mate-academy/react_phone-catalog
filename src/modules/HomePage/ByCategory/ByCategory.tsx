import { Link } from 'react-router-dom';
import { Product } from '../../shared/types/Product';
import styles from './ByCategory.module.scss';
import { asset } from '../../shared/utils/asset';

type Props = {
  products: Product[];
};

export const ByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(
    phone => phone.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    tablet => tablet.category === 'tablets',
  ).length;

  const accssoriesCount = products.filter(
    accessory => accessory.category === 'accessories',
  ).length;

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2 className={styles.title}>Shop by category</h2>
      </div>
      <div className={styles.categories}>
        <div className={styles.category}>
          <Link
            to={`/phones`}
            className={`${styles.categoryLink} ${styles.categoryLinkPhones}`}
          >
            <img
              src={asset('/img/category-phones.webp')}
              alt="Mobile phones"
              className={styles.categoryImg}
            />
          </Link>
          <div className={styles.categoryInfo}>
            <h3 className={styles.categoryInfoTitle}>Mobile phones</h3>
            <p className={styles.categoryInfoCount}>{phonesCount} models</p>
          </div>
        </div>
        <div className={styles.category}>
          <Link
            to={`/tablets`}
            className={`${styles.categoryLink} ${styles.categoryLinkTablets}`}
          >
            <img
              src={asset('/img/category-tablets.webp')}
              alt="Tablets"
              className={styles.categoryImg}
            />
          </Link>
          <div className={styles.categoryInfo}>
            <h3 className={styles.categoryInfoTitle}>Tablets</h3>
            <p className={styles.categoryInfoCount}>{tabletsCount} models</p>
          </div>
        </div>
        <div className={styles.category}>
          <Link
            to={`/accessories`}
            className={`${styles.categoryLink} ${styles.categoryLinkAccessories}`}
          >
            <img
              src={asset('/img/category-accessories.webp')}
              alt="Accessories"
              className={styles.categoryImg}
            />
          </Link>
          <div className={styles.categoryInfo}>
            <h3 className={styles.categoryInfoTitle}>Accessories</h3>
            <p className={styles.categoryInfoCount}>{accssoriesCount} models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
