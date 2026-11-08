import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { Pagination } from '../../components/Pagination/Pagination';

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

  const perPage =
    perPageParam === 'all' ? tablets.length : Number(perPageParam);

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

  if (isLoading) {
    return (
      <section className="phones-page">
        <nav className="phones-page__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="phones-page__home-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6.5L8 2L14 6.5V13.5C14 13.7761 13.7761
                14 13.5 14H10V10H6V14H2.5C2.22386 14 2 13.7761 2 13.5V6.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="phones-page__slash">/</span>
          <span>{t('tablets')}</span>
        </nav>

        <h1 className="phones-page__title">{t('tablets')}</h1>

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
      <section className="phones-page">
        <p>{t('somethingWentWrong')}</p>

        <button type="button" onClick={loadProducts}>
          {t('reload')}
        </button>
      </section>
    );
  }

  return (
    <section className="phones-page">
      <nav className="phones-page__breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="phones-page__home-link">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6.5L8 2L14 6.5V13.5C14 13.7761 13.7761
              14 13.5 14H10V10H6V14H2.5C2.22386 14 2 13.7761 2 13.5V6.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="phones-page__slash">/</span>
        <span className="phones-page__current">{t('tablets')}</span>
      </nav>

      <h1 className="phones-page__title">{t('tablets')}</h1>
      <p className="phones-page__models-count">{tablets.length} models</p>

      {tablets.length === 0 ? (
        <p>{query ? t('noTabletsMatching') : t('noTablets')}</p>
      ) : (
        <>
          <div className="phones-page__filters">
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
          </div>

          <ProductsList products={visibleTablets} />

          {perPageParam !== 'all' && (
            <Pagination
              total={tablets.length}
              perPage={perPage}
              currentPage={page}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </section>
  );
};
