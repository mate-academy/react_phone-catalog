import { Link } from 'react-router-dom';
import { Product, ProductCategory } from '../../../shared/types/Product';
import styles from './ShopByCategory.module.scss';

type Props = {
  products: Product[];
};

type CategoryTile = {
  title: string;
  category: ProductCategory;
  image: string;
};

const categories: CategoryTile[] = [
  {
    title: 'Mobile phones',
    category: 'phones',
    image: './img/category-phones.webp',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    image: './img/category-tablets.webp',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    image: './img/category-accessories.webp',
  },
];

export const ShopByCategory = ({ products }: Props) => {
  return (
    <section>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.tiles}>
        {categories.map(({ title, category, image }) => {
          const count = products.filter(
            product => product.category === category,
          ).length;

          return (
            <Link to={`/${category}`} key={category} className={styles.tile}>
              <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
              </div>

              <h3 className={styles.name}>{title}</h3>
              <p className={styles.count}>{count} models</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
