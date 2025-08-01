import { useMemo } from 'react';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import { NavLink } from 'react-router-dom';

type Props = {
  products: (Product | ProductDetailed)[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const categoryPhones = '/img/categoryBanner/category-phones.png';
  const categoryTablets = '/img/categoryBanner/category-tablets.png';
  const categoryAccessories = '/img/categoryBanner/category-accessories2.png';

  const phonesAmount = useMemo(
    () => products.filter(p => p.category === 'phones').length,
    [products],
  );
  const tabletsAmount = useMemo(
    () => products.filter(p => p.category === 'tablets').length,
    [products],
  );
  const accessoriesAmount = useMemo(
    () => products.filter(p => p.category === 'accessories').length,
    [products],
  );

  const categories = [
    {
      name: 'Mobile phones',
      category: 'phones',
      image: categoryPhones,
      count: phonesAmount,
    },
    {
      name: 'Tablets',
      category: 'tablets',
      image: categoryTablets,
      count: tabletsAmount,
    },
    {
      name: 'Accessories',
      category: 'accessories',
      image: categoryAccessories,
      count: accessoriesAmount,
    },
  ];

  return (
    <div className={styles.categorySection}>
      <h2 className={styles.categorySection__title}>Shop by category</h2>

      <div className={styles.categorySection__grid}>
        {categories.map(({ name, category, image, count }) => (
          <NavLink className={styles.categoryLink} to={`/${category}`} key={category}>
            <div className={styles.categorySection__item}>
              <div
                className={`${styles.categorySection__imgContainer} ${styles[`categorySection__imgContainer--${category}`]}`}
              >
                <img
                  className={`${styles.categorySection__img} ${styles[`categorySection__img--${category}`]}`}
                  src={image}
                  alt={category}
                />
              </div>
              <p className={styles.categorySection__categoryName}>{name}</p>
              <p className={styles.categorySection__categoryCount}>
                {count} {count === 1 ? 'model' : 'models'}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
