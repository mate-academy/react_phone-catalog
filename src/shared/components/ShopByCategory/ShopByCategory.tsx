import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { getAllProducts } from '../../../services/productsService';

import catPhones from '../../../../public/img/category-phones.png';
import catTablets from '../../../../public/img/category-tablets.png';
import catAccessories from '../../../../public/img/category-accessories.png';

export const ShopByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadAllProducts() {
      const productsFromServer = await getAllProducts();

      setProducts(productsFromServer);
    }

    loadAllProducts();
  }, []);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const categories = [
    {
      name: 'Mobile phones',
      path: '/phones',
      img: catPhones,
      count: phonesCount,
    },
    {
      name: 'Tablets',
      path: '/tablets',
      img: catTablets,
      count: tabletsCount,
    },
    {
      name: 'Accessories',
      path: '/accessories',
      img: catAccessories,
      count: accessoriesCount,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        {categories.map(cat => (
          <Link key={cat.name} to={cat.path} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={cat.img} alt={cat.name} className={styles.image} />
            </div>

            <h3 className={styles.name}>{cat.name}</h3>
            <p className={styles.count}>{cat.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
