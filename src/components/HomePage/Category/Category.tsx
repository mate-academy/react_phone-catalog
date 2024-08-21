import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { HeaderPageListsSection } from '../../../types/PageForShow';
import { GadjetCategory } from '../../../types/GadjetCategory';

interface CategoryData {
  image: string;
  name: string;
  count: number;
}

interface Props {
  categories: Record<GadjetCategory, CategoryData>;
  setCurrentPage: React.Dispatch<React.SetStateAction<HeaderPageListsSection>>;
}

export const Category: React.FC<Props> = ({ categories, setCurrentPage }) => {
  const handleSetPage = (category: GadjetCategory) => {
    if (category === GadjetCategory.Phones) {
      setCurrentPage(HeaderPageListsSection.Phones);
    } else if (category === GadjetCategory.Tablets) {
      setCurrentPage(HeaderPageListsSection.Tablets);
    } else if (category === GadjetCategory.Accessories) {
      setCurrentPage(HeaderPageListsSection.Accessories);
    }
  };

  return (
    <section className={`page__category ${styles.category}`}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <nav className={styles.category__content}>
        <ul className={styles.category__list}>
          {Object.values(GadjetCategory).map(category => (
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
