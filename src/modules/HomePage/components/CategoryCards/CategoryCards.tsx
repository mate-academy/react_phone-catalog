import { Link } from 'react-router-dom';
import { Category, Product } from '../../../../types';
import styles from './CategoryCards.module.scss';

const CATEGORIES: { category: Category; title: string; image: string }[] = [
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

const countModels = (products: Product[], category: Category) =>
  products.filter(product => product.category === category).length;

export const CategoryCards = ({ products }: { products: Product[] }) => (
  <div className={styles['category-cards']}>
    <h2 className={styles['category-cards__title']}>Shop by category</h2>

    <ul className={styles['category-cards__list']}>
      {CATEGORIES.map(({ category, title, image }) => (
        <li key={category}>
          <Link to={`/${category}`} className={styles['category-cards__link']}>
            <div className={styles['category-cards__image-wrapper']}>
              <img
                src={image}
                alt={title}
                className={styles['category-cards__image']}
              />
            </div>

            <h3 className={styles['category-cards__name']}>{title}</h3>
            <p className={styles['category-cards__count']}>
              {countModels(products, category)} models
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
