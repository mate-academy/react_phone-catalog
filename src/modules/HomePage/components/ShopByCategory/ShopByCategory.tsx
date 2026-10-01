import { Link } from 'react-router-dom';
import { Category } from '../../../../types/Product';
import styles from './ShopByCategory.module.scss';

type CategoryItem = {
  category: Category;
  title: string;
  image: string;
};

const getImageUrl = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('public/')
    ? path.replace('public/', '')
    : path;

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
};

const categories: CategoryItem[] = [
  {
    category: 'phones',
    title: 'Mobile phones',
    image: 'img/category-phones.webp',
  },
  { category: 'tablets', title: 'Tablets', image: 'img/category-tablets.webp' },
  {
    category: 'accessories',
    title: 'Accessories',
    image: 'img/category-accessories.webp',
  },
];

type Props = {
  counts: Record<Category, number>;
};

export const ShopByCategory = ({ counts }: Props) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <ul className={styles.list}>
        {categories.map(({ category, title, image }) => (
          <li key={category} className={styles.item}>
            <Link to={`/${category}`} className={styles.imageLink}>
              <img
                src={getImageUrl(image)}
                alt={title}
                className={styles.image}
              />
            </Link>
            <p className={styles.categoryTitle}>{title}</p>
            <p className={styles.categoryCount}>{counts[category]} models</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
