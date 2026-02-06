import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

interface Product {
  category: string;
}

const ShopByCategory = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch('./api/products.json');
        const data: Product[] = await response.json();

        const phonesCount = data.filter(p => p.category === 'phones').length;
        const tabletsCount = data.filter(p => p.category === 'tablets').length;
        const accessoriesCount = data.filter(
          p => p.category === 'accessories',
        ).length;

        setCounts({
          phones: phonesCount,
          tablets: tabletsCount,
          accessories: accessoriesCount,
        });
      } catch (error) {
        setCounts({
          phones: 0,
          tablets: 0,
          accessories: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  const categories = [
    {
      name: 'Mobile phones',
      count: counts.phones,
      image: '/img/Phones.png',
      link: '/phones',
    },
    {
      name: 'Tablets',
      count: counts.tablets,
      image: '/img/Tablets.png',
      link: '/tablets',
    },
    {
      name: 'Accessories',
      count: counts.accessories,
      image: '/img/Accessories.png',
      link: '/accessories',
    },
  ];

  return (
    <section className={styles.category}>
      <div className={styles.category_label}>
        <h2>Shop by category</h2>
      </div>

      {categories.map(category => (
        <div key={category.link} className={styles.category_card}>
          <Link to={category.link}>
            <div className={styles.category_card_image}>
              <img src={category.image} alt={category.name} />
            </div>
          </Link>
          <div>
            <div>
              <h4 className={styles.category_card_name}>{category.name}</h4>
            </div>
            <div className={styles.category_card_count}>
              {loading ? '...' : `${category.count} models`}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShopByCategory;
