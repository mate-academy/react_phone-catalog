import React, { useEffect, useState } from 'react';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { ShopByCategoryMap } from '../Helpers/ShopByCategoryMap';
import { getProductsByCategory } from '../../../../servises/Products';
import { BASE_URL } from '../../../../utils/const';

export const Categories: React.FC = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);

  useEffect(() => {
    const fetchProductCounts = async () => {
      const categories = ['phones', 'tablets', 'accessories'];

      const productCounts = await Promise.all(
        categories.map(category => getProductsByCategory(category)),
      );

      setPhonesCount(productCounts[0].length);
      setTabletsCount(productCounts[1].length);
      setAccessoriesCount(productCounts[2].length);
    };

    fetchProductCounts();
  }, []);

  return (
    <div className={styles.categories}>
      <h1 className={styles.title}>Shop by category</h1>

      {ShopByCategoryMap.map(({ id, src, title, path }) => (
        <div className={styles.category} key={id}>
          <Link to={path} className={styles.link}>
            <img
              src={`${BASE_URL}/${src}`}
              alt={title}
              className={styles.image}
            />

            <h2 className={styles.category__title}>{title}</h2>

            <span className={styles.category__subtitle}>
              <span className={styles.category__subtitle}>
                {(title === 'Mobile phones' && `${phonesCount} models`) ||
                  (title === 'Tablets' && `${tabletsCount} models`) ||
                  (title === 'Accessories' && `${accessoriesCount} models`)}
              </span>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};
