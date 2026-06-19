import { useCallback, useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { AnyProduct, CatalogList } from './components/CatalogList';
import { useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../services/product.api';
import { Loader } from '../shared/components/UI/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<AnyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    if (!category) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

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
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRestart = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>{errorMessage}</p>

        <button
          type="button"
          className={styles.restartButton}
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    );
  }

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Catalog';

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <Breadcrumbs />

        <CatalogList products={products} title={pageTitle} />
      </div>
    </div>
  );
};
