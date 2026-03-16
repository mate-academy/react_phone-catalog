import styles from './ShopByCategory.module.scss';
import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../../api/products';
import { Link } from 'react-router-dom';
import { Skeleton } from '../Skeleton/Skeleton';

export const ShopByCategory = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const [phones, tablets, accessories] = await Promise.all([
        getPhones(),
        getTablets(),
        getAccessories(),
      ]);

      setPhonesCount(phones.length);
      setTabletsCount(tablets.length);
      setAccessoriesCount(accessories.length);
      setLoading(false);
    };

    loadCounts();
  }, []);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <Link to="/phones" className={styles.card}>
          <img src="img/phones-category.png" alt="Phones" />
          <h3>Mobile phones</h3>
          <span>
            {' '}
            {/* 👈 */}
            {loading ? (
              <Skeleton height="14px" width="60px" />
            ) : (
              `${phonesCount} ${phonesCount === 1 ? 'model' : 'models'}`
            )}
          </span>
        </Link>

        <Link to="/tablets" className={styles.card}>
          <img src="img/tablets-category.png" alt="Tablets" />
          <h3>Tablets</h3>
          <span>
            {' '}
            {/* 👈 */}
            {loading ? (
              <Skeleton height="14px" width="60px" />
            ) : (
              `${tabletsCount} ${tabletsCount === 1 ? 'model' : 'models'}`
            )}
          </span>
        </Link>

        <Link to="/accessories" className={styles.card}>
          <img src="img/accessories-category.png" alt="Accessories" />
          <h3>Accessories</h3>
          <span>
            {' '}
            {/* 👈 */}
            {loading ? (
              <Skeleton height="14px" width="60px" />
            ) : (
              `${accessoriesCount} ${accessoriesCount === 1 ? 'model' : 'models'}`
            )}
          </span>
        </Link>
      </div>
    </div>
  );
};
