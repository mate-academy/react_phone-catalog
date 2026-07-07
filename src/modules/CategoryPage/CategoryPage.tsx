import { useParams } from 'react-router-dom';

import styles from './CategoryPage.module.scss';

export const CategoryPage = () => {
  const { category } = useParams();

  return (
    <section className={styles.categoryPage}>
      <h1 className={styles.title}>{category}</h1>
      <p>Category page</p>
    </section>
  );
};
