import { NavLink } from 'react-router-dom';
import styles from './ShopCategory.module.scss';
export const ShopCategories = () => {

  return (<div className={styles.shop}>
   <div className={styles.shop__title}>
  <h2>Shop by Category</h2>
    </div>
    <article className={styles.shop__category}>
      <NavLink >

          <div className={styles.shop__image}>
            <img
              src='./img/categories/category-phones.webp'
              alt='Mobile phone category'
            />
          </div>

      <h3>Mobile phones</h3>
      <p>10 models</p>
    </NavLink>
    </article>
     <article className={styles.shop__category}>
      <NavLink >

          <div className={styles.shop__image}>
            <img
              src='/img/categories/category-phones.webp'
              alt='Mobile phone category'
            />
          </div>

      <h3>Mobile phones</h3>
      <p>10 models</p>
    </NavLink>
    </article>
     <article className={styles.shop__category}>
      <NavLink >

          <div className={styles.shop__image}>
            <img
              src='/img/categories/category-phones.webp'
              alt='Mobile phone category'
            />
          </div>

      <h3>Mobile phones</h3>
      <p>10 models</p>
    </NavLink>
    </article>

</div>
 )
}
