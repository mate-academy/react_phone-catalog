import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { CatalogList } from './components/CatalogList';
import { Product } from '../../types/product';
import { useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../services/product.api';

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      let data: Product[] = [];

      switch (category) {
        case 'phones':
          data = await getPhones();
          break;
        case 'tablets':
          data = await getTablets();
          break;
        case 'accessories':
          data = await getAccessories();
          break;

        default:
          data = [];
      }

      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, [category]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <CatalogList products={products} title={`${category}`} />
      </div>
    </div>
  );
};
