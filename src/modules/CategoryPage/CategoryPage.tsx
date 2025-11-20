import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { Product } from '../shared/types';
import { useDebounce } from '../shared/hooks/useDebounce';
import { Input } from '../../components/UI/Input/Input';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from './components/ProductCard';
import { CustomSelect } from '../../components/UI/CustomSelect/CustomSelect';

export const CategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>('all');
  const debouncedSearch = useDebounce(search, 2000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`api/${type}.json`);

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
        setCurrentPage(1);
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

  const effectiveItemsPerPage =
    itemsPerPage === 'all' ? products.length : itemsPerPage;

  const indexOfLastItem = currentPage * effectiveItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - effectiveItemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    <div className={styles.error}>
      <img
        src="img/product-not-found.png"
        alt={t('productNotFound')}
        className={styles.errorImage}
      />
      <p>{error}</p>
    </div>;
  }

  return (
    <div className={styles.category}>
      <Breadcrumbs />
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('search')}</label>
          <Input
            className={styles.search}
            placeholder={t('search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('sort')}</label>
          <CustomSelect
            value={sort}
            onChange={val => setSort(val as string)}
            options={[
              { value: 'default', label: t('newestFirst') },
              { value: t('priceLowToHigh'), label: t('priceLowToHigh') },
              { value: t('priceHighToLow'), label: t('priceHighToLow') },
            ]}
            placeholder={t('sort')}
          />
        </div>

        {/* <p className={styles.pageInfo}>{t('itemsOnPage')}</p> */}

        <div className={styles.filterGroup}>
          <label className={styles.label}>{t('itemsOnPage')}</label>

          <CustomSelect
            value={itemsPerPage}
            onChange={val => {
              setItemsPerPage(val === 'all' ? 'all' : +val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'all', label: t('all') },
              { value: '4', label: '4' },
              { value: '8', label: '8' },
              { value: '16', label: '16' },
            ]}
            placeholder={t('itemsOnPage')}
          />
        </div>
      </div>
      <div
        className={styles.productsContainer}
        style={{ minHeight: loading ? '200px' : 'auto' }}
      >
        <div className={styles.productsGrid}>
          {currentItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          {t('previous')}
        </button>
        <span className={styles.pageInfo}>
          {t('page')} {currentPage} {t('of')} {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};
