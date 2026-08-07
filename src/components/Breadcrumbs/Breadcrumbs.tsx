// ..  Breadcrumbs.tsx
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

import home from '/icons/home.svg';
import chevronArrowRight from '/icons/chevron-arrow-right.svg';

interface BreadcrumbsProps {
  category: string;
  productName?: string;
}

export const Breadcrumbs = ({ category, productName }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
      <ul className={styles.list}>
        {/* 1. Іконка додому */}
        <li className={styles.li}>
          <Link to="/" className={styles.link}>
            <img src={home} alt="Home" className={styles.iconHome} />
          </Link>
        </li>

        {/* Перша стрілочка */}
        <li className={styles.li} aria-hidden="true">
          <img src={chevronArrowRight} alt="arrow" className={styles.arrow} />
        </li>

        {/* 2. Категорія (Phones / Tablets / Accessories) */}
        <li className={styles.li}>
          {productName ? (
            // ЯКЩО є назва товару -> категорія стає ПОСИЛАННЯМ на сторінку каталогу
            <Link to={`/${category.toLowerCase()}`} className={styles.link}>
              {category}
            </Link>
          ) : (
            // ЯКЩО товару немає -> це сторінка каталогу, тому категорія просто ТЕКСТ
            <span className={styles.current}>
              {category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
            </span>
          )}
        </li>

        {/* 3. Назва товару (малюємо ТІЛЬКИ якщо нам передали productName) */}
        {productName && (
          <>
            {/* Друга стрілочка */}
            <li className={styles.li} aria-hidden="true">
              <img
                src={chevronArrowRight}
                alt="arrow"
                className={styles.arrow}
              />
            </li>

            {/* Назва самого товару */}
            <li className={styles.li}>
              <span className={styles.current}>{productName}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
