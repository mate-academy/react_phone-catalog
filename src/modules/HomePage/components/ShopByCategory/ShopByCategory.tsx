import { Link } from 'react-router-dom';

import { Product } from '../../../shared/types/Product';
import { getAssetUrl } from '../../../shared/utils/assets';
import styles from './ShopByCategory.module.scss';

const categories = [
  {
    title: 'Mobile phones',
    category: 'phones',
    image: 'img/category-phones.webp',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    image: 'img/category-tablets.webp',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    image: 'img/category-accessories.webp',
  },
];

type Props = {
  products: Product[];
};

export const ShopByCategory = ({ products }: Props) => (
  <section className={styles.section}>
    <h2>Shop by category</h2>

    <div className={styles.grid}>
      {categories.map(category => {
        const total = products.filter(
          product => product.category === category.category,
        ).length;

        return (
          <Link
            to={`/${category.category}`}
            className={styles.category}
            key={category.category}
          >
            <span className={styles.imageBox}>
              <img src={getAssetUrl(category.image)} alt="" />
            </span>

            <span className={styles.title}>{category.title}</span>
            <span className={styles.count}>{total} models</span>
          </Link>
        );
      })}
    </div>
  </section>
);
