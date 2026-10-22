import { Link } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';

const categories = [
  {
    name: 'Mobile phones',
    image: `${import.meta.env.BASE_URL}img/category-phones.png`,
    path: '/phones',
    models: '95 models',
  },
  {
    name: 'Tablets',
    image: `${import.meta.env.BASE_URL}img/category-tablets.png`,
    path: '/tablets',
    models: '24 models',
  },
  {
    name: 'Accessories',
    image: `${import.meta.env.BASE_URL}img/category-accessories.png`,
    path: '/accessories',
    models: '100 models',
  },
];

export const ShopByCategory = () => {
  return (
    <div className={styles.categories}>
      {categories.map(category => (
        <Link
          key={category.name}
          to={category.path}
          className={styles.category}
        >
          <div className={styles.imageWrapper}>
            <img
              src={category.image}
              alt={category.name}
              className={styles.image}
            />
          </div>

          <h3 className={styles.name}>{category.name}</h3>

          <p className={styles.models}>{category.models}</p>
        </Link>
      ))}
    </div>
  );
};
