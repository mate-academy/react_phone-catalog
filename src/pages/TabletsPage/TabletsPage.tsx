import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, Product } from '../../components/ProductCard';
import styles from './TabletsPage.module.scss';
import { getProducts } from '../../api/products';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Загружаем каталог и фильтруем по категории 'tablets'
    getProducts()
      .then((data: Product[]) => {
        const tabletProducts = data.filter(item => item.category === 'tablets');

        setTablets(tabletProducts);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error('Failed to load tablets:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src="img/icons/home.svg" alt="Home" />
        </Link>
        <span>›</span>
        <span>Tablets</span>
      </div>

      <h1 className={styles.title}>Tablets</h1>
      <p className={styles.subtitle}>{tablets.length} models</p>

      {isLoading ? (
        <div>Loading tablets...</div>
      ) : tablets.length > 0 ? (
        <div className={styles.productsGrid}>
          {tablets.map(tablet => (
            <ProductCard key={tablet.id} product={tablet} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          No tablets available at the moment.
        </div>
      )}
    </div>
  );
};
