import styles from './Categories.module.scss';
import { CategoryList } from './CategoryList';

export const Categories = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>
      <CategoryList />
    </section>
  );
};
