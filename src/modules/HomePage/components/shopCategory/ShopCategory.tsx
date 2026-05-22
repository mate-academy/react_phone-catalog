import { NavLink } from 'react-router-dom';
import styles from './ShopCategory.module.scss';

import { useAppSelector } from '../../../../app/hooks';
const categoryShop = [
  {
    image: './img/categories/category-phones.webp',
    title: 'Mobile Phones',
    to: '/phones',
    value: 'phones',
  },
  {
    image: './img/categories/category-tablets.webp',
    title: 'Tablets',
    to: '/tablets',
    value: 'tablets',
  },
  {
    image: './img/categories/category-accessories.webp',
    title: 'Accessories',
    to: '/accessories',
    value: 'accessories',
  },
];

export const ShopCategories = () => {
  const products = useAppSelector(state => state.products.products);

  return (
    <div className={styles.shop}>
      <div className={styles.shop__title}>
        <h2>Shop by Category</h2>
      </div>

      {categoryShop.map(category => {
        const choseProduct = products.filter(
          product => product.category === category.value,
        ).length;

        return (
          <article key={category.title} className={styles.shop__category}>
            <NavLink className={styles.shop__link} to={`${category.to}`}>
              <div className={styles.shop__image}>
                <img src={category.image} alt="Mobile phone category" />
              </div>

              <h3 className={styles.shop__text}>{category.title}</h3>

              <p className={styles.shop__count}>{`${choseProduct} models`} </p>
            </NavLink>
          </article>
        );
      })}
    </div>
  );
};
