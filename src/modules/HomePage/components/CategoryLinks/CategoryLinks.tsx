import { Link } from 'react-router-dom';
import { Category } from '../../../../types/Category';
import { Product } from '../../../../types/Product';
import styles from './CategoryLinks.module.scss';

const CATEGORIES: {
  category: Category;
  title: string;
  image: string;
}[] = [
  {
    category: 'phones',
    title: 'Mobile phones',
    image: 'img/category-phones.webp',
  },
  {
    category: 'tablets',
    title: 'Tablets',
    image: 'img/category-tablets.webp',
  },
  {
    category: 'accessories',
    title: 'Accessories',
    image: 'img/category-accessories.webp',
  },
];

interface Props {
  products: Product[];
}

export const CategoryLinks = ({ products }: Props) => (
  <section aria-labelledby="shop-by-category">
    <h2 id="shop-by-category" className={styles.title}>
      Shop by category
    </h2>

    <ul className={styles.list}>
      {CATEGORIES.map(({ category, title, image }) => {
        const count = products.filter(
          product => product.category === category,
        ).length;

        return (
          <li key={category}>
            <Link to={`/${category}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                <img src={image} alt="" className={styles.image} />
              </div>

              <h3 className={styles.name}>{title}</h3>
              <p className={styles.count}>{count} models</p>
            </Link>
          </li>
        );
      })}
    </ul>
  </section>
);
