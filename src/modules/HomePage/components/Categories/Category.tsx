import { FC } from 'react';
import { ProductCategoriesMap } from '../Helpers/ProductCategoriesMap';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

export const Category: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.categoriesTitle}>Shop by category</h2>
      <div className={styles.categoriesWrapper}>
        {ProductCategoriesMap.map(item => {
          return (
            <Link to={item.path} key={item.id}>
              <div className={styles.itemContent}>
                <img
                  className={styles.itemImg}
                  src={item.srcImg}
                  alt={item.title}
                />
                <h3 className={styles.itemTitle}> {item.title}</h3>
                <h5 className={styles.itemCountModels}>{232} models</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
