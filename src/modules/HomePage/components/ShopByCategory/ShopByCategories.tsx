import { useContext } from 'react';
import styles from './ShopByCategories.module.scss';
import { ProductsContext } from '../../../shared/_store/DataProvider';
import { Category, Product } from '../../../../_types/products';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { filteredByCategory } from '../../../../_services/products';

type Props = {};

export const ShopByCategories: React.FC<Props> = () => {
  const { products } = useContext(ProductsContext);
  const categories: {
    name: string;
    path: string;
    items: Product[];
  }[] = [
    {
      name: 'Mobile phones',
      path: 'phones',
      items: filteredByCategory(Category.phones, products),
    },
    {
      name: 'Tablets',
      path: 'tablets',
      items: filteredByCategory(Category.tablets, products),
    },
    {
      name: 'Accessories',
      path: 'accessories',
      items: filteredByCategory(Category.accessories, products),
    },
  ];

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__content}>
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={category.name}
            className={styles.categories__category}
          >
            <div
              className={classNames(
                styles.categories__image,
                styles[`categories__image--${index + 1}`],
              )}
            ></div>
            <h4 className={styles.categories__subtitle}>{category.name}</h4>
            <div className={styles.categories__quantity}>
              {category.items.length} models
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
