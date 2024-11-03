import styles from '../ShopCategory/ShopCategory.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Category } from '../../../../types/Category';
import phone from '../../../../../public/api/phones.json';
import tablet from '../../../../../public/api/tablets.json';
import watch from '../../../../../public/api/accessories.json';

export const ShopCategory = () => {
  return (
    <section className={styles.shopCategoryContainer}>
      <h2 className={styles.title}>Shop by category</h2>

      {Object.keys(Category).map((category, index) => (
        <div
          className={classNames(
            styles.categoryContainer,
            styles[`categoryContainer${index + 1}`],
          )}
          key={category}
        >
          <Link
            to={`${category}`}
            className={classNames(
              styles.imgContainer,
              styles[`imgContainer${index + 1}`],
            )}
          >
            <img
              src={`img/${category}-category.webp`}
              alt={`${category}`}
              className={styles.imgItem}
            />
          </Link>
          <h4 className={styles.categoryTitle}>
            {category === Category.phones
              ? 'Mobile phones'
              : category === Category.tablets
                ? 'Tablets'
                : 'Watches'}
          </h4>
          <p className={styles.categoryNumModels}>
            {(category === Category.phones
              ? phone.length
              : category === Category.tablets
                ? tablet.length
                : watch.length) + ' '}
            models
          </p>
        </div>
      ))}
    </section>
  );
};
