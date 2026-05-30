import { NavLink } from 'react-router-dom';
import { useProductHook } from '../ProductPage/useProductHook';
import styles from './Category.module.scss';
import { categories } from './categoryList';

export const Category = () => {
  const { phones } = useProductHook();

  return (
    <div className={styles.card}>
      {categories.map((category, index) => (
        <div className={styles.card__category} key={index}>
          <NavLink to={category.link} className={styles.card__link}>
            <img
              src={category.image}
              alt={category.title}
              className={styles.card__image}
            />
            <h3 className={styles.card__title}>{category.title}</h3>
            <h3
              className={styles.card__description}
            >{`${phones.length} models`}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
};
