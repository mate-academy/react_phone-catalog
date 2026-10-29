import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import styles from './ShopByCategory.module.scss';

const CATEGORIES = [
  {
    title: 'Mobile phones',
    category: 'phones',
    to: '/phones',
    image: 'img/phones-category.png',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    to: '/tablets',
    image: 'img/tablets-category.png',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    to: '/accessories',
    image: 'img/accessories-category.png',
  },
];

interface Props {
  products: Product[];
}

export const ShopByCategory = ({ products }: Props) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        {CATEGORIES.map(item => {
          const count = products.filter(
            product => product.category === item.category,
          ).length;

          return (
            <Link key={item.category} to={item.to} className={styles.tile}>
              <div className={styles.imageWrap}>
                <img className={styles.image} src={item.image} alt="" />
              </div>

              <h3 className={styles.tileTitle}>{item.title}</h3>
              <p className={styles.count}>{count} models</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
