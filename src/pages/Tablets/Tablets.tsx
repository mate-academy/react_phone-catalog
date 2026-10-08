import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';

export const Tablets = () => {
  const { t } = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || 'all';

  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  const loadProducts = () => {
    setIsLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>{t('tablets')}</h1>

        <div className="products-skeleton">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{t('somethingWentWrong')}</p>

        <button type="button" onClick={loadProducts}>
          {t('reload')}
        </button>
      </section>
    );
  }

  const tablets = products
    .filter(product => product.category === 'tablets')
    .filter(product => product.name.toLowerCase().includes(query))
    .sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'price':
          return a.price - b.price;

        case 'age':
          return b.year - a.year;

        default:
          return b.year - a.year;
      }
    });

  if (tablets.length === 0) {
    return (
      <section>
        <h1>{t('tablets')}</h1>

        <p>{query ? t('noTabletsMatching') : t('noTablets')}</p>
      </section>
    );
  }

  const perPage =
    perPageParam === 'all' ? tablets.length : Number(perPageParam);

  const totalPages = Math.ceil(tablets.length / perPage);

  const startIndex = (page - 1) * perPage;

  const visibleTablets = tablets.slice(startIndex, startIndex + perPage);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', event.target.value);
    newParams.delete('page');

    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  const goToPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  return (
    <section>
      <h1>{t('tablets')}</h1>

      <label>
        {t('sortBy')}{' '}
        <select value={sort} onChange={handleSortChange}>
          <option value="age">{t('newest')}</option>

          <option value="name">{t('alphabetically')}</option>

          <option value="price">{t('cheapest')}</option>
        </select>
      </label>

      <label>
        {t('itemsPerPage')}{' '}
        <select value={perPageParam} onChange={handlePerPageChange}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">{t('all')}</option>
        </select>
      </label>

      <ProductsList products={visibleTablets} />

      {totalPages > 1 && perPageParam !== 'all' && (
        <div>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            {t('prev')}
          </button>

          <span>
            {' '}
            {t('page')} {page} {t('of')} {totalPages}{' '}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            {t('next')}
          </button>
        </div>
      )}
    </section>
  );
};
