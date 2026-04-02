import { NavLink } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useMemo } from 'react';
import { Product } from '../../../../types';

type Props = {
  products: Product[];
};

type CategoryType = 'phones' | 'tablets' | 'accessories';

type Category = {
  title: string;
  img: string;
  to: string;
  category: CategoryType;
};

const categories: Category[] = [
  {
    title: 'Mobile phones',
    category: 'phones',
    to: '/phones',
    img: '/img/category-phones.png',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    to: '/tablets',
    img: '/img/category-tablets.png',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    to: '/accessories',
    img: '/img/category-accessories.png',
  },
];

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const categoryCounts = useMemo(() => {
    return {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };
  }, [products]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(c => (
          <NavLink key={c.to} to={c.to} className={styles.card}>
            <div className={styles.imageWrap}>
              <img className={styles.image} src={c.img} alt={c.title} />
            </div>

            <div className={styles.meta}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardSubtitle}>
                {categoryCounts[c.category]} models
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};
