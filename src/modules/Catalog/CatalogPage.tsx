import { useCallback, useEffect, useState } from 'react';
import {
  CatalogCategory,
  useCatalogCategory,
} from '../../hooks/useCatalogCategory';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from './components/ProductsList';
import { getProducts } from '../../api/products';
import styles from './CatalogPage.module.scss';
import { ProductCategory } from '../../types/ProductCategory';
import { Pagination } from '../shared/components/Pagination';
import { BreadCrumbs } from '../shared/components/BreadCrumbs';
import { useSearchParams } from 'react-router-dom';
import { CustomSelect } from './components/Select';

export type PerPageType = '4' | '8' | '16' | 'all';

export const CatalogPage = () => {
  const category: CatalogCategory | null = useCatalogCategory();

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const activePage = searchParams.get('page') || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const from = (+activePage - 1) * +perPage;
  const to = from + +perPage;
  const productsPage = perPage === 'all' ? products : products.slice(from, to);

  const titles: Record<ProductCategory, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const updateParam = useCallback(
    (param: string, value: string | number | null) => {
      const newParams = new URLSearchParams(searchParams);

      const stringValue = value?.toString() ?? '';

      const isDefault =
        (param === 'page' && stringValue === '1') ||
        (param === 'perPage' && stringValue === 'all');

      if (!stringValue || isDefault) {
        newParams.delete(param);
      } else {
        newParams.set(param, stringValue);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(p => {
        setProducts([...p].filter(product => product.category === category));
      })
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    updateParam('page', '1');
  }, [perPage, sort, updateParam]);

  useEffect(() => {
    setProducts(prev => {
      const sorted = [...prev];

      switch (sort) {
        case 'title':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          sorted.sort((a, b) => a.price - b.price);
          break;

        case 'age':
        default:
          sorted.sort((a, b) => b.year - a.year);
          break;
      }

      return sorted;
    });
  }, [sort]);

  return (
    <div className="container">
      {loadingError && !isLoading && <h1>Something went wrong</h1>}

      {!isLoading && products.length === 0 && (
        <h1>{`There no ${category} yet`}</h1>
      )}

      <div className={styles.catalog}>
        <BreadCrumbs category={category as ProductCategory} />
        <h1 className={styles.title}>{titles[category as ProductCategory]}</h1>
        <p className={styles['category-qnt']}>{products.length} models</p>

        <div className={styles.filters}>
          <div className={styles['filter-sort']}>
            <p className={styles.label}>Sort by</p>
            <CustomSelect
              value={sort}
              onChange={v => updateParam('sort', v)}
              options={[
                { value: 'age', label: 'Newest' },
                { value: 'title', label: 'Alphabetically' },
                { value: 'price', label: 'Cheapest' },
              ]}
            />
          </div>

          <div className={styles['filter-perPage']}>
            <p className={styles.label}>Items on page</p>
            <CustomSelect
              value={perPage}
              onChange={v => updateParam('perPage', v)}
              options={[
                { value: '4', label: '4' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
                { value: 'all', label: 'all' },
              ]}
            />
          </div>
        </div>

        {isLoading && <Loader />}

        {products.length > 0 && <ProductsList products={productsPage} />}

        {perPage !== 'all' && (
          <Pagination
            total={products.length}
            perPage={perPage as PerPageType}
            currentPage={+activePage}
            onPageChange={page => updateParam('page', page)}
          />
        )}
      </div>
    </div>
  );
};
