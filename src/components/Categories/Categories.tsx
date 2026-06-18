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
      <h2 className={styles.title}>{title}</h2>
      <div>
        {categories.map(category => {
          const count = products.filter(
            p => p.category === category.category,
          ).length;

          return (
            <Link to={category.link} key={category.category}>
              <img
                src={category.image}
                alt={category.title}
                className={styles.image}
              />
              <h3>{category.title}</h3>
              <p>{count} models</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};
