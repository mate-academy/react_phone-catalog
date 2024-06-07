import classNames from 'classnames';
import styles from './Category.module.scss';
import { CategoryCard } from './components/CategoryCard/CategoryCard';
import { useContext } from 'react';
import { StateContext } from '../../../../Store';

export const Category = () => {
  const { products } = useContext(StateContext);

  const categories = [
    {
      name: 'Mobile phones',
      cover: 'img/categories/categories_phones.png',
      number: products.filter(item => item.category === 'phones').length,
      path: 'phones',
    },
    {
      name: 'Tablets',
      cover: 'img/categories/categories_tablets.png',
      number: products.filter(item => item.category === 'tablets').length,
      path: 'tablets',
    },
    {
      name: 'Accessories',
      cover: 'img/categories/categories_accessories.png',
      number: products.filter(item => item.category === 'accessories').length,
      path: 'accessories',
    },
  ];

  return (
    <section className={classNames(styles.container, styles.category)}>
      <h2
        className={classNames(styles.sectionTitle, [styles.category__header])}
      >
        Shop by category
      </h2>

      {categories.map(category => (
        <div
          key={category.name}
          className={classNames(styles.category__card, [
            styles[`category__card-${category.path}`],
          ])}
        >
          {
            <CategoryCard
              name={category.name}
              cover={category.cover}
              numbers={category.number}
              path={category.path}
            />
          }
        </div>
      ))}
    </section>
  );
};
