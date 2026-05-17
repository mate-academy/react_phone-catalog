import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

type Category = {
  name: string;
  path: string;
  bg: string;
  image: string;
};

const categories: Category[] = [
  {
    name: 'Mobile phones',
    path: '/phones',
    bg: '#6D6474',
    image: './img/category-phones.webp',
  },
  {
    name: 'Tablets',
    path: '/tablets',
    bg: '#8D8D92',
    image: './img/category-tablets.webp',
  },
  {
    name: 'Accessories',
    path: '/accessories',
    bg: '#973D5F',
    image: './img/category-accessories.webp',
  },
];

export const ShopByCategory = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then((data: { category: string }[]) => {
        const result = data.reduce<Record<string, number>>(
          (acc, p) => ({
            ...acc,
            [p.category]: (acc[p.category] ?? 0) + 1,
          }),
          {},
        );

        setCounts(result);
      });
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(({ name, path, bg, image }) => {
          const key = path.slice(1);

          return (
            <Link key={path} to={path} className={styles.card}>
              <div
                className={styles.imageWrapper}
                style={{ backgroundColor: bg }}
              >
                <img src={image} alt={name} className={styles.image} />
              </div>

              <div className={styles.info}>
                <p className={styles.cardTitle}>{name}</p>
                <p className={styles.cardCount}>{counts[key] ?? 0} models</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
