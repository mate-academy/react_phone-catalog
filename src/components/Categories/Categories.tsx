import styles from './Categories.module.scss';
import { Loader } from '../Loader';
import { useCategories } from './hooks/useCategories';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { counts, isLoading } = useCategories();

  if (isLoading) {
    return <Loader />;
  }

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
          <Link to={`/${link}`} key={title} className={styles.card}>
            <div className={`${styles.imageContainer} ${styles[link]}`}>
              <img src={img} alt={title} className={styles.image} />
            </div>
            <h4 className={styles.cardTitle}>{title}</h4>
            <p className={styles.modelsCount}>{amount} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
