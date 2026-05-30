/* eslint-disable import/extensions */
import React, { useMemo } from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { Dropdown } from '../shared/components/Dropdown';
import { useProducts } from '@/hooks/useProducts';
import { ProductsList } from '../shared/components/ProductsList';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';

interface Props {
  category: string;
}

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { products, loading, error } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const perPageOptions: number[] = [4, 8, 16];

  const page = parseInt(searchParams.get('page') || '1');
  const perPageFromUrl = searchParams.get('perPage');

  const sort = searchParams.get('sort') || 'age';
  const order = searchParams.get('order') || 'desc';

  const perPage =
    perPageFromUrl === null
      ? 'All' // Default when no perPage in URL
      : perPageFromUrl.toLowerCase() === 'all'
        ? 'All'
        : perPageOptions.includes(parseInt(perPageFromUrl))
          ? parseInt(perPageFromUrl)
          : 'All';

  const sortingOptions = [
    { label: 'Most recent', sort: 'age', order: 'desc' },
    { label: 'Price, low to high', sort: 'price', order: 'asc' },
    { label: 'Price, high to low', sort: 'price', order: 'desc' },
    { label: 'Alphabetically, A - Z', sort: 'title', order: 'asc' },
    { label: 'Alphabetically, Z - A', sort: 'title', order: 'desc' },
  ];

  const getCurrentSortLabel = () => {
    const currentOption = sortingOptions.find(
      option => option.sort === sort && option.order === order,
    );
    return currentOption?.label || 'Most recent';
  };

  const handleSortChange = (selectedLabel: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const selectedOption = sortingOptions.find(
      option => option.label === selectedLabel,
    );

    if (selectedOption) {
      // Only add parameters to URL if it's NOT the default "Most recent"
      if (selectedOption.sort === 'age' && selectedOption.order === 'desc') {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      } else {
        newSearchParams.set('sort', selectedOption.sort);
        newSearchParams.set('order', selectedOption.order);
      }
    }

    // Reset to first page when changing sort
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  const handlePerPageChange = (selectedOption: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (selectedOption === 'All') {
      newSearchParams.delete('perPage');
    } else {
      newSearchParams.set('perPage', selectedOption);
    }

    // Reset to first page when changing items per page
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', newPage.toString());
    }

    setSearchParams(newSearchParams);
  };

  const processedProducts = useMemo(() => {
    let processed = products.filter(
      product => product.category === category.toLowerCase(),
    );

    if (sort && order) {
      const hasUrlParams =
        searchParams.get('sort') && searchParams.get('order');

      processed = [...processed].sort((a, b) => {
        let comparison = 0;

        switch (sort) {
          case 'age':
            comparison = b.year - a.year;
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'title':
            comparison = a.name.localeCompare(b.name, 'en-US', {
              numeric: true,
            });
            break;
          default:
            return 0;
        }

        // Apply order direction
        if (hasUrlParams) {
          return order === 'desc' ? -comparison : comparison;
        } else {
          // For default "Most recent", use the natural comparison (newest first)
          return comparison;
        }
      });
    }

    return processed;
  }, [products, category, sort, order]);

  const itemsPerPage =
    perPage === 'All' ? processedProducts.length : (perPage as number);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currItems = processedProducts.slice(startIndex, endIndex);

  return (
    <main className={classNames('container', styles.product_page)}>
      <Breadcrumbs links={[category]}></Breadcrumbs>
      <div className={styles.product_page__text}>
        <h1>{category}</h1>
        <p className={classNames('text__body', styles.product_page__qty)}>
          {processedProducts.length} items
        </p>
      </div>
      <div className={styles.product_page__filters}>
        <Dropdown
          title="Sort by"
          selectedOption={getCurrentSortLabel()}
          options={sortingOptions.map(option => option.label)}
          onSelect={handleSortChange}
        ></Dropdown>
        <Dropdown
          title="Items on page"
          selectedOption={perPage.toString()}
          options={[...perPageOptions.map(option => option.toString()), 'All']}
          onSelect={handlePerPageChange}
        ></Dropdown>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error}></ErrorMessage>}
      {processedProducts && (
        <>
          <ProductsList products={currItems}></ProductsList>
          {perPage !== 'All' &&
            Math.ceil(processedProducts.length / itemsPerPage) > 1 && (
              <Pagination
                total={processedProducts.length}
                perPage={itemsPerPage}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
        </>
      )}
    </main>
  );
};
