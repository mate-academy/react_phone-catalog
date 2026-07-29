import { Link } from 'react-router-dom';
import { Product, ProductCategory } from '@/types/Product';
import { getImageUrl } from '@/utils/getImageUrl';
import styles from './ShopByCategory.module.scss';

const categories: {
  to: string;
  label: string;
  image: string;
  category: ProductCategory;
}[] = [
  {
    to: '/phones',
    label: 'Mobile phones',
    image: 'img/category-phones.webp',
    category: 'phones',
  },
  {
    to: '/tablets',
    label: 'Tablets',
    image: 'img/category-tablets.webp',
    category: 'tablets',
  },
  {
    to: '/accessories',
    label: 'Accessories',
    image: 'img/category-accessories.webp',
    category: 'accessories',
  },
];

type Props = {
  products: Product[];
};

export const ShopByCategory = ({ products }: Props) => (
  <section className={styles.section}>
    <h2 className={styles.title}>Shop by category</h2>

    <ul className={styles.list}>
      {categories.map(({ to, label, image, category }) => {
        const count = products.filter(
          product => product.category === category,
        ).length;

        return (
          <li key={to} className={styles.item}>
            <Link to={to} className={styles.link}>
              <span className={`${styles.imageWrapper} image-link`}>
                <img
                  src={getImageUrl(image)}
                  alt={label}
                  className={styles.image}
                />
              </span>
              <span className={styles.label}>{label}</span>
              <span className={styles.count}>{count} models</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </section>
);
