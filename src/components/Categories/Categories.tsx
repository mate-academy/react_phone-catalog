import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './Categories.module.scss';

interface Props {
  products: Product[];
  title: string;
}

export const Categories = ({ title, products }: Props) => {
  const categories = [
    {
      title: 'Mobile phones',
      image: '/img/category-phones.png',
      link: '/phones',
      category: 'phones',
    },
    {
      title: 'Tablets',
      image: '/img/category-tablets.png',
      link: '/tablets',
      category: 'tablets',
    },
    {
      title: 'Accessories',
      image: '/img/category-accessories.png',
      link: '/accessories',
      category: 'accessories',
    },
  ];

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        {categories.map(category => {
          const count = products.filter(
            p => p.category === category.category,
          ).length;

          return (
            <Link
              to={category.link}
              key={category.category}
              className={styles.link}
            >
              <img
                src={category.image}
                alt={category.title}
                className={styles.image}
              />
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <p className={styles.count}>{count} models</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};
