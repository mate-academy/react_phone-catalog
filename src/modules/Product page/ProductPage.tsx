import { capitalize } from 'lodash';
import { Loader } from './components/Loader/Loader';
import React from 'react';
import Product from '../../types/product';
import { ProductsList } from './components/ProductsList/ProductsList';
import styles from './ProductPage.module.scss';
import { SortSelect } from './components/SortSelect/SortSelect';
import { useSearchParams } from 'react-router-dom';
import { ItemsPerPageSelect } from './components/ItemsPerPageSelect/ItemsPerPageSelect';
import { Pagination } from './components/Pagination/Pagination';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { WrongMessage } from '../../components/WrongMessage/WrongMessage';
import { useTranslation } from 'react-i18next';

type Props = {
  category: string;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const perPage =
    perPageParam === 'all' ? 0 : parseInt(perPageParam || '16', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const { t } = useTranslation();

  const localizedCategory = t(`categories.${category}`);

  const loadData = async (url: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setError(t('catalog.error'));

        return;
      }

      const newData = await response.json();
      const filteredData = newData.filter(
        (item: Product) => item.category === category,
      );

      setData(filteredData);
    } catch (e) {
      setError(t('catalog.error'));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  React.useEffect(() => {
    loadData(`./api/products.json`);
  }, [category]);

  // Filter data by query
  const queriedData = React.useMemo(() => {
    if (!query) {
      return data;
    }

    return data.filter(product => product.name.toLowerCase().includes(query));
  }, [data, query]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!queriedData) {
      return [];
    }

    switch (sort) {
      case 'age':
        return [...queriedData].sort((a, b) => b.year - a.year);
      case 'title':
        return [...queriedData].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...queriedData].sort((a, b) => a.price - b.price);
      default:
        return queriedData;
    }
  }, [queriedData, sort]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (perPage === 0) {
      return sortedData;
    } // Show all items

    const start = (page - 1) * perPage;

    return sortedData.slice(start, start + perPage);
  }, [sortedData, page, perPage]);

  if (!isLoading && paginatedData.length === 0) {
    if (query) {
      return <WrongMessage title={t('catalog.queryEmpty', { query })} />;
    }

    return (
      <WrongMessage title={t('catalog.emptyError', { localizedCategory })} />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <WrongMessage
        title={error}
        showReload={true}
        onReload={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={styles.ProductPage}>
      <div className={styles.ProductPage__header}>
        <div className={styles.ProductPage__breadcrumbs}>
          <Breadcrumbs />
        </div>
        <div className={styles.ProductPage__titleContainer}>
          <h1 className={styles.ProductPage__title}>
            {capitalize(t(`categories.${category}`))}
          </h1>
          <div className={styles.ProductPage__amount}>
            {queriedData.length} {t('categories.models')}
          </div>
        </div>

        <div className={styles.ProductPage__controls}>
          <SortSelect className={styles.ProductPage__controls_sort} />
          <ItemsPerPageSelect
            className={styles.ProductPage__controls_perPage}
          />
        </div>
      </div>

      <div className={styles.ProductPage__content}>
        {!isLoading && !error && paginatedData.length > 0 && (
          <ProductsList products={paginatedData} />
        )}
        <Pagination
          totalItems={sortedData.length}
          itemsPerPage={perPage}
          currentPage={page}
          onPageChange={newPage => {
            const newParams = new URLSearchParams(searchParams);

            if (newPage === 1) {
              newParams.delete('page');
            } else {
              newParams.set('page', newPage.toString());
            }

            setSearchParams(newParams);
          }}
        />
      </div>
    </div>
  );
};
