import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import styles from './Categories.module.scss';

const CATEGORIES = ['phones', 'tablets', 'accessories'];

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(ProductContext);

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__mainTitle}>Shop by category</h2>
      <ul className={styles.categories__list}>
        {CATEGORIES.map(category => (
          <li key={category} className={styles.categories__item}>
            <img
              src={`img/homepage/category-${category}.png`}
              alt="black iphone 14 pro front and rear"
              className={styles.categories__img}
            />
            <Link to={`/${category}`} className={styles.categories__link}>
              <h4 className={styles.categories__title}>
                {category === 'phones' ? 'mobile phones' : category}
              </h4>
            </Link>
            <p className={styles.categories__count}>
              {category === 'phones'
                ? phones.length
                : category === 'tablets'
                  ? tablets.length
                  : accessories.length}{' '}
              model(s)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
