import React from 'react';
import styles from './Category.module.scss';
import { PageSection } from '../../../types/PageSection';
import { GadgetCategory } from '../../../types/GadgetCategory';
import { Link } from 'react-router-dom';

interface CategoryData {
  name: string;
  image: string;
  count: number;
}

interface Props {
  categories: Record<GadgetCategory, CategoryData>;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
}

export const Category: React.FC<Props> = ({ categories, setCurrentPage }) => {
  const handleSetPage = (category: GadgetCategory) => {
    if (category === GadgetCategory.Phones) {
      setCurrentPage(PageSection.Phones);
    } else if (category === GadgetCategory.Tablets) {
      setCurrentPage(PageSection.Tablets);
    } else if (category === GadgetCategory.Accessories) {
      setCurrentPage(PageSection.Accessories);
    }
  };

  return (
    <section className={`page__category ${styles.category}`}>
      <h1 className={styles.category__title}>Shop by category</h1>
      <nav className={styles.category__content}>
        <ul className={styles.category__list}>
          {Object.values(GadgetCategory).map(category => (
            <li
              className={styles.category__item}
              key={category}
              onClick={() => handleSetPage(category)}
            >
              <Link
                to={category === 'Mobile phones' ? 'Phones' : category}
                className={styles.category__link}
              >
                <img
                  className={styles.category__image}
                  src={categories[category].image}
                  alt={category}
                />
                <div className={styles.category__text}>
                  <h3 className={styles.category__name}>
                    {categories[category].name}
                  </h3>
                  <p className={styles.category__count}>
                    {`${categories[category].count} models`}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
