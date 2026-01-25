import styles from './Categories.module.scss';
import { useCategories } from './hooks/useCategories';

export const Categories = () => {
  const counts = useCategories();

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        {[
          {
            title: 'Mobile phones',
            amount: counts.phones,
            img: '/img/category-phones.webp',
            link: 'phones',
          },
          {
            title: 'Tablets',
            amount: counts.tablets,
            img: '/img/category-tablets.png',
            link: 'tablets',
          },
          {
            title: 'Accessories',
            amount: counts.accessories,
            img: '/img/category-accessories.png',
            link: 'accessories',
          },
        ].map(({ title, amount, img, link }) => (
          <article key={title} className={styles.card}>
            <div className={`${styles.imageContainer} ${styles[link]}`}>
              <img src={img} alt={title} className={styles.image} />
            </div>
            <h4 className={styles.cardTitle}>{title}</h4>
            <p className={styles.modelsCount}>{amount} models</p>
          </article>
        ))}
      </div>
    </section>
  );
};
