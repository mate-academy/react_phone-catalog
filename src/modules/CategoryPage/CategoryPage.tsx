import { useLocation } from 'react-router-dom';

import styles from './CategoryPage.module.scss';

const categoryTitles: Record<string, string> = {
  '/phones': 'Mobile phones',
  '/tablets': 'Tablets',
  '/accessories': 'Accessories',
};

export const CategoryPage = () => {
  const { pathname } = useLocation();

  const title = categoryTitles[pathname] || 'Products';

  return (
    <section className={styles.categoryPage}>
      <h1 className={styles.title}>{title}</h1>
      <p>{title} page</p>
    </section>
  );
};
