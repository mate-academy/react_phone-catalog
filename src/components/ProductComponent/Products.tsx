import { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useProducts } from '../../contexts/ProductContext';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { Item } from '../../types/Item';
import { Dropdown } from '../Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

type Props = {
  products: Item[];
};

export const Products: React.FC<Props> = ({ products }) => {
  const { t, i18n } = useTranslation();
  const [sortedBy, setSortedBy] = useState(t(''));
  const [sortedProducts, setSortedProducts] = useState<Item[]>([]);
  const [perPage, setPerPage] = useState<number | string>(t(''));
  const [page, setPage] = useState<number>(1);
  const { allProducts } = useProducts();
  const itemsOnPage = [4, 8, 16, t('filtering.all')];
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { theme } = useTheme();

  useEffect(() => {
    setSortedBy(t('filtering.newest'));
    setPerPage(t('filtering.all'));
  }, [i18n.language, t]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handlePerPageChange = (val: string | number) => {
    if (val === t('filtering.all')) {
      setPerPage(t('filtering.all'));
    } else {
      setPerPage(Number(val));
    }

    setPage(1);
  };

  let startIndex = 0;
  let endIndex = sortedProducts.length;

  useEffect(() => {
    const params: Record<string, string | number> = {
      ...Object.fromEntries(searchParams),
      sort:
        sortedBy === t('filtering.newest')
          ? 'age'
          : sortedBy === t('filtering.alphabetically')
            ? 'title'
            : 'price',
    };

    if (page !== 1) {
      params.page = page;
    } else {
      delete params.page;
    }

    if (perPage !== t('filtering.all')) {
      params.perPage = perPage;
    } else {
      delete params.perPage;
    }

    if (debouncedQuery.length !== 0) {
      params.query = debouncedQuery;
    } else {
      delete params.query;
    }

    setSearchParams(params);
  }, [sortedBy, perPage, page, debouncedQuery, t]);

  if (typeof perPage === 'number') {
    startIndex = (page - 1) * perPage;
    endIndex = startIndex + perPage;
  }

  const currentItems = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    let result = [...products];

    switch (sortedBy) {
      case t('filtering.newest'):
        result.sort((a, b) => {
          const yearA = allProducts.find(p => p.itemId === a.id)?.year || 0;
          const yearB = allProducts.find(p => p.itemId === b.id)?.year || 0;

          return yearB - yearA;
        });
        break;
      case t('filtering.alphabetically'):
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case t('filtering.cheapest'):
        result.sort((a, b) => a.priceRegular - b.priceRegular);
        break;
    }

    if (debouncedQuery) {
      // eslint-disable-next-line max-len
      result = result.filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
    }

    setSortedProducts(result);
  }, [products, sortedBy, allProducts, debouncedQuery, t]);

  return (
    <div className={styles.products}>
      <form className={styles.products__form}>
        <div className={`${styles.products__formElement} ${styles['products__formElement--sort']}`}>
          <label htmlFor="sortBy" className={styles.products__label}>
            {t('filtering.sortBy')}
          </label>

          <Dropdown
            options={[
              t('filtering.newest'),
              t('filtering.alphabetically'),
              t('filtering.cheapest'),
            ]}
            value={sortedBy}
            onChange={val => setSortedBy(val as string)}
            isSortBy={true}
          />
        </div>

        <div className={`${styles.products__formElement}`}>
          <label htmlFor="itemsPerPage" className={styles.products__label}>
            {t('filtering.itemsOnPage')}
          </label>

          <Dropdown
            options={itemsOnPage}
            value={perPage}
            onChange={val => handlePerPageChange(val)}
            isSortBy={false}
          />
        </div>

        <div
          className={`${styles.products__formElement} ${styles['products__formElement--search']} ${theme === 'light' && styles['products__formElement--search-lightTheme']}`}
        >
          <label htmlFor="search" className={styles.products__label}>
            {t('filtering.search')}
          </label>

          <input
            type="text"
            placeholder={t('filtering.placeholder')}
            value={query}
            id="search"
            onChange={e => setQuery(e.target.value)}
            className={`${styles.products__input} ${theme === 'light' && styles['products__input--lightTheme']}`}
          />
        </div>
      </form>

      {debouncedQuery.length > 0 && sortedProducts.length === 0 ? (
        <p className={styles.products__noProducts}>
          {products[0].category === 'phones'
            ? t('errors.phonesNotFound')
            : products[0].category === 'tablets'
              ? t('errors.tabletsNotFound')
              : t('errors.accessoriesNotFound')}
        </p>
      ) : (
        <ProductsList currentItems={currentItems} isFavorites={false} isWideCard={true} />
      )}

      {perPage !== 'All' && sortedProducts.length > 0 && (
        <Pagination
          total={sortedProducts.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={(p: number) => {
            setPage(p);
          }}
        />
      )}
    </div>
  );
};
