/* eslint-disable max-len */
import React, { useContext, useMemo, useState } from 'react';
import styles from './ProductPage.module.scss';
import { ProductsContext } from '../../ProductsProvider';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';
import { SortField } from './SortField';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { ProductsList } from './ProductsList';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const categoryTitle = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const emptyMessage = {
    phones: 'There are no phones yet',
    tablets: 'There are no tablets yet',
    accessories: 'There are no accessories yet',
  };

  const { products, isLoading, errorMessage } = useContext(ProductsContext);
  const filteredProducts = products.filter(product => product.category === category);

  const [searchParams, setSearchParams] = useSearchParams();

  const [item, setItem] = useState('8');
  const [openSort, setOpenSort] = useState(false);
  const [openItem, setOpenItem] = useState(false);

  const sort = searchParams.get('sort') || 'Newest';
  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || '8';

  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((filteredProduct1, filteredProduct2) => {
        switch (sort) {
          case 'Newest':
            return filteredProduct2.year - filteredProduct1.year;
          case 'Alphabetically':
            return filteredProduct1.name.localeCompare(filteredProduct2.name);
          case 'Cheapest':
            return filteredProduct1.price - filteredProduct2.price;
          default:
            return 0;
        }
      }),
    [filteredProducts, sort],
  );

  const pagesCount = Math.ceil(sortedProducts.length / +perPage);

  const startIndex = (page - 1) * +perPage;
  const endIndex = Math.min(page * +perPage, sortedProducts.length);

  const pages = [...Array(pagesCount)].map((_, i) => i + 1);

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    const prevPage = Math.max(page - 1, 1);

    params.set('page', String(prevPage));
    setSearchParams(params);
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);

    const nextPage = Math.min(page + 1, pagesCount);

    params.set('page', String(nextPage));
    setSearchParams(params);
  };

  const handleSetPerPage = (newPerPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', String(newPerPage));
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSetPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const handleSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', String(newSort));

    setSearchParams(params);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {sortedProducts.length === 0 && <h2 className={styles.error}>{emptyMessage[category]}</h2>}

      {errorMessage && (
        <div className={styles.errorcontent}>
          <h2 className={styles.error}>Something went wrong</h2>
          <button className={styles.reload} onClick={handleReload}>
            Reload
          </button>
        </div>
      )}

      {sortedProducts.length !== 0 && !isLoading && !errorMessage && (
        <>
          <Breadcrumbs categoryTitle={categoryTitle[category]} />
          <div className={styles.upper}>
            <h1 className={styles.title}>{categoryTitle[category]}</h1>
            <span>{filteredProducts.length} models</span>
            <SortField
              filteredProducts={filteredProducts}
              sort={sort}
              setSort={handleSort}
              openSort={openSort}
              setOpenSort={setOpenSort}
              item={item}
              setItem={setItem}
              openItem={openItem}
              setOpenItem={setOpenItem}
              setPerPage={handleSetPerPage}
            />
          </div>
          <ProductsList
            sortedProducts={sortedProducts}
            startIndex={startIndex}
            endIndex={endIndex}
          />
          {pagesCount > 1 && (
            <div className={styles.pagination}>
              <Pagination
                pages={pages}
                selectedPage={page}
                pagesCount={pagesCount}
                setSelectedPage={handleSetPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
