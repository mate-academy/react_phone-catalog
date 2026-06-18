import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../../../types/Product';

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const categoryData = [
    {
      title: 'Mobile phones',
      link: '/phones',
      count: `${phonesCount} models`,
      image: '/img/category-phones.webp',
    },
    {
      title: 'Tablets',
      link: '/tablets',
      count: `${tabletsCount} models`,
      image: '/img/category-tablets.webp',
    },
    {
      title: 'Accessories',
      link: '/accessories',
      count: `${accessoriesCount} models`,
      image: '/img/category-accessories.webp',
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>

      <div className={styles.grid}>
        {categoryData.map(category => (
          <div key={category.link} className={styles.card}>
            <Link to={category.link} className={styles.imageWrapper}>
              <img
                src={category.image}
                alt={category.title}
                className={styles.image}
              />
            </Link>

            <Link to={category.link} className={styles.titleLink}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </Link>

            <span className={styles.count}>{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
