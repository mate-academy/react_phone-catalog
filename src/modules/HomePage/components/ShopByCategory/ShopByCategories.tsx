import { useContext } from 'react';
import styles from './ShopByCategories.module.scss';
import { ProductsContext } from '../../../shared/_store/DataProvider';
import { Category, ProductsWithDetails } from '../../../../_types/products';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {};

export const ShopByCategories: React.FC<Props> = () => {
  const { products } = useContext(ProductsContext);
  const filteredByCategory = (category: Category) =>
    products.filter(product => product.category === category);
  const categories: {
    name: string;
    path: string;
    items: ProductsWithDetails[];
  }[] = [
    {
      name: 'Mobile phones',
      path: 'phones',
      items: filteredByCategory(Category.phones),
    },
    {
      name: 'Tablets',
      path: 'tablets',
      items: filteredByCategory(Category.tablets),
    },
    {
      name: 'Accessories',
      path: 'accessories',
      items: filteredByCategory(Category.accessories),
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
