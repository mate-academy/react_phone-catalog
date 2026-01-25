import { useEffect, useState } from 'react';
import styles from './Categories.module.scss';
import { Product } from '../../types/Product';

export const Categories = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('api/products.json');
        const products: Product[] = await res.json();

        const newCounts = {
          phones: 0,
          tablets: 0,
          accessories: 0,
        };

        products.forEach(product => {
          if (product.category === 'phones') {
            newCounts.phones += 1;
          }

          if (product.category === 'tablets') {
            newCounts.tablets += 1;
          }

          if (product.category === 'accessories') {
            newCounts.accessories += 1;
          }
        });

        setCounts(newCounts);
      } catch {
        setCounts({
          phones: 0,
          tablets: 0,
          accessories: 0,
        });
      }
    };

    load();
  }, []);

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
