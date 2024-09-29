import { FC, useEffect, useState } from 'react';
import { сategoriesMap } from '../Helpers/сategoriesMap';
import { getCountByCategory } from '../../../../utils/numberOfProduct';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { Product } from '../../../../types/Product';
import { getAllProducts } from '../../../../services/Product';

export const Category: FC = () => {
  const [prod, setProd] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getAllProducts();

      setProd(data);
    };

    fetchProduct();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.categoriesTitle}>Shop by category</h2>
      <div className={styles.categoriesWrapper}>
        {сategoriesMap.map(item => {
          return (
            <Link to={item.path} key={item.id}>
              <div className={styles.itemContent}>
                <img
                  className={styles.itemImg}
                  src={item.srcImg}
                  alt={item.title}
                />
                <h3 className={styles.itemTitle}> {item.title}</h3>
                <h5 className={styles.itemCountModels}>
                  {getCountByCategory(prod, item.category)} models
                </h5>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
