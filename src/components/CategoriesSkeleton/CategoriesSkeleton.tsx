import styles from './CategoriesSkeleton.module.scss';

const cards = [0, 1, 2];

export const CategoriesSkeleton = () => {
  return (
    <section className={styles.categories}>
      <div className={`${styles.block} ${styles.title}`} />
      <div className={styles.list}>
        {cards.map(item => (
          <div key={item} className={styles.card}>
            <div className={`${styles.block} ${styles.image}`} />
            <div className={`${styles.block} ${styles.cardTitle}`} />
            <div className={`${styles.block} ${styles.modelsCount}`} />
          </div>
        ))}
      </div>
    </section>
  );
};
