import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { AnyProduct, CatalogList } from './components/CatalogList';
import { useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../services/product.api';
import { Loader } from '../shared/components/UI/Loader';

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<AnyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        let data: AnyProduct[] = [];

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
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Catalog';

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <CatalogList products={products} title={pageTitle} />
      </div>
    </div>
  );
};
