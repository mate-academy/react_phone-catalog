import { Link } from 'react-router-dom';
import { categoryItems } from '@data/categoriesData';

import cn from 'classnames';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <section className={cn(styles.category, 'section')}>
      <h2 className={cn(styles.category__title, 'secondary-title')}>
        Shop by category
      </h2>
      <div className={styles.category__list}>
        {categoryItems.map(category => (
          <Link
            to={category.link}
            key={category.title}
            className={styles.category__item}
          >
            <div
              className={styles.category__wrapper}
              style={{ backgroundColor: category.bgColor }}
            >
              <img
                src={category.image}
                alt={category.tag}
                className={cn(
                  styles.category__wrapper_image,
                  styles[category.tag],
                )}
              />
            </div>
            <h4 className={cn(styles.category__name, 'small-title')}>
              {category.title}
            </h4>
            <p className={styles.category__count}>{category.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
