import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useProducts } from '../../store/ProductsContext';
import styles from './Categories.module.scss';

type QuantityKeys = 'phones' | 'accessories' | 'tablets';

export const Categories = () => {
  const { phones, accessories, tablets } = useProducts();
  const quantity: Record<QuantityKeys, number> = {
    phones: phones.length,
    accessories: accessories.length,
    tablets: tablets.length,
  };

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <ul className={styles.categories__list}>
        {categories.slice(1).map((category, index) => {
          const { title, name, img } = category;

          return (
            <li
              className={classNames(
                styles.categories__category,
                styles.category,
                styles[`category--${index + 1}`],
              )}
              key={index}
            >
              <Link to={name} className={styles.category__link}>
                <img src={img} alt={title} className={styles.category__img} />
                <h4 className={styles.category__title}>{title}</h4>
                <p
                  className={styles.category__quantity}
                >{`${quantity[name as QuantityKeys]} models`}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
