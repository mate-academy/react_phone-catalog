import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { Product } from '../shared/types';
import { ProductsList } from './components/ProductsList/ProductsList';
import { useDebounce } from '../shared/hooks/useDebounce';
import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';

export const CategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/${type}.json`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
        }

        const data: Product[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected an array');
        }

        const normalizedData = data.map(item => ({
          ...item,
          priceDiscount: item.priceDiscount ?? item.priceRegular,
        }));
        let filtered = normalizedData;

        if (debouncedSearch) {
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
          );
        }

        if (sort === 'priceLowToHigh') {
          filtered.sort(
            (a, b) =>
              (a.priceDiscount ?? a.priceRegular ?? 0) -
              (b.priceDiscount ?? b.priceRegular ?? 0),
          );
        } else if (sort === 'priceHighToLow') {
          filtered.sort(
            (a, b) =>
              (b.priceDiscount ?? b.priceRegular ?? 0) -
              (a.priceDiscount ?? a.priceRegular ?? 0),
          );
        }

        setProducts(filtered);
      } catch (err) {
        setError(
          t('errorLoading') + (err instanceof Error ? `${err.message}` : ''),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, debouncedSearch, sort, t]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.category}>
      <div className={styles.filters}>
        <Input
          placeholder={t('search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.search}
        />
        <Select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className={styles.sort}
        >
          <option value={'default'}>{t('sort')}</option>
          <option value={'priceLowToHigh'}>{t('priceLowToHigh')}</option>
          <option value={'priceHighToLow'}>{t('priceHighToLow')}</option>
        </Select>
      </div>
      <div
        className={styles.productsContainer}
        style={{ minHeight: loading ? '200px' : 'auto' }}
      >
        {!loading && !error && <ProductsList products={products} />}
      </div>
    </div>
  );
};
