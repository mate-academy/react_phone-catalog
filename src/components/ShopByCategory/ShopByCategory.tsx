import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useProducts } from '../../hooks/use-products';
import { DetailedProduct } from '../../types';

const CATEGORIES = [
  {
    id: 'phones',
    label: 'Mobile phones',
    count: 0,
    image: 'img/category-phones.png',
    bg: '#6D6474',
    to: '/phones',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    count: 0,
    image: 'img/category-tablets.png',
    bg: '#8D8D92',
    to: '/tablets',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    count: 0,
    image: 'img/category-accessories.png',
    bg: '#973D5F',
    to: '/accessories',
  },
];

export const ShopByCategory = () => {
  const { products: accessoriesProducts } =
    useProducts<DetailedProduct>('accessories');

  const { products: phonesProducts } = useProducts<DetailedProduct>('phones');

  const { products: tabletsProducts } = useProducts<DetailedProduct>('tablets');

  const counts = {
    phones: phonesProducts.length,
    tablets: tabletsProducts.length,
    accessories: accessoriesProducts.length,
  };

  const categories = CATEGORIES.map(cat => ({
    ...cat,
    count: counts[cat.id] ?? 0,
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.grid}>
        {categories.map(cat => (
          <Link to={cat.to} key={cat.id} className={styles.card}>
            <div
              className={styles.imageWrap}
              style={{ backgroundColor: cat.bg }}
            >
              <div
                style={{ backgroundImage: `url(${cat.image})` }}
                className={styles.image}
              ></div>
            </div>
            <p className={styles.catName}>{cat.label}</p>
            <p className={styles.catCount}>{cat.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
