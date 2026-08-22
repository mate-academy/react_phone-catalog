import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { getImageUrl } from '../../../../utils/getImageUrl';
import styles from './ShopByCategory.module.scss';

type Props = {
  products: Product[];
};

const CATEGORIES = [
  { key: 'phones', label: 'Phones', path: '/phones', image: 'category-phones' },
  {
    key: 'tablets',
    label: 'Tablets',
    path: '/tablets',
    image: 'category-tablets',
  },
  {
    key: 'accessories',
    label: 'Accessories',
    path: '/accessories',
    image: 'category-accessories',
  },
] as const;

export const ShopByCategory: React.FC<Props> = ({ products }) => (
  <section className={styles.categories}>
    <h2 className={styles.categories__title}>Shop by category</h2>

    <div className={styles.categories__grid}>
      {CATEGORIES.map(category => {
        const count = products.filter(
          product => product.category === category.key,
        ).length;

        return (
          <Link
            key={category.key}
            to={category.path}
            className={styles.categories__card}
          >
            <picture>
              <source
                srcSet={getImageUrl(`img/${category.image}.webp`)}
                type="image/webp"
              />
              <img
                className={styles.categories__cardImage}
                src={getImageUrl(`img/${category.image}.png`)}
                alt={category.label}
                loading="lazy"
              />
            </picture>
            <span className={styles.categories__cardLabel}>
              {category.label}
            </span>
            <span className={styles.categories__cardCount}>{count} models</span>
          </Link>
        );
      })}
    </div>
  </section>
);
