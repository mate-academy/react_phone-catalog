import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categoriesData';
import { useProducts } from '../../store/ProductsContext';
import { CategoryName } from '../../types/CategoryName';
import styles from './Categories.module.scss';

export const Categories = () => {
  const { phones, accessories, tablets } = useProducts();
  const quantity = {
    phones: phones.length,
    accessories: accessories.length,
    tablets: tablets.length,
  };

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <ul className={styles.categories__list}>
        {categories.slice(1).map((category, index) => (
          <li
            className={classNames(
              styles.categories__category,
              styles.category,
              styles[`category--${index + 1}`],
            )}
            key={index}
          >
            <Link to={category.name} className={styles.category__link}>
              <img
                src={category.img}
                alt={category.title}
                className={styles.category__img}
              />
              <h4 className={styles.category__title}>{category.title}</h4>
              <p
                className={styles.category__quantity}
              >{`${quantity[category.name as CategoryName]} models`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
