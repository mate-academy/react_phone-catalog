import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ShopByCategory.module.scss';

const categories = [
  {
    to: '/phones',
    title: 'Mobile phones',
    img: '/img/category-phones.webp',
    file: '/api/phones.json',
  },
  {
    to: '/tablets',
    title: 'Tablets',
    img: '/img/category-tablets.webp',
    file: '/api/tablets.json',
  },
  {
    to: '/accessories',
    title: 'Accessories',
    img: '/img/category-accessories.webp',
    file: '/api/accessories.json',
  },
];

export const ShopByCategory = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadCounts = async () => {
      const data = await Promise.all(
        categories.map(async c => {
          const res = await fetch(c.file);
          const arr = await res.json();

          return [c.title, arr.length] as const;
        }),
      );

      setCounts(Object.fromEntries(data));
    };

    loadCounts();
  }, []);

  return (
    <section className={s.root}>
      <div className={s.inner}>
        <h2 className={s.title}>Shop by category</h2>
        <div className={s.grid}>
          {categories.map(c => (
            <Link key={c.to} to={c.to} className={s.card}>
              <div className={s.image}>
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className={s.texts}>
                <div className={s.label}>{c.title}</div>
                <div className={s.meta}>
                  {counts[c.title] ? `${counts[c.title]} models` : '...'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
