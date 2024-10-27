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
        <div className={styles.categoryContainer} key={category}>
          <Link
            to=".."
            className={classNames(
              styles.imgContainer,
              styles[`imgContainer${index + 1}`],
            )}
          >
            <img
              src={`/public/img/${category}-category.png`}
              alt={`${category}`}
              className={styles.imgItem}
            />
          </Link>
          <h4 className={styles.categoryTitle}>
            {category === Category.mobile
              ? 'Mobile phones'
              : category === Category.tablet
                ? 'Tablets'
                : 'Watches'}
          </h4>
          <p className={styles.categoryNumModels}>
            {(category === Category.mobile
              ? phone.length
              : category === Category.tablet
                ? tablet.length
                : watch.length) + ' '}
            products
          </p>
        </div>
      ))}
    </section>
  );
};
