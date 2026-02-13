import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ProductPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { getCategoryTitle } from '../shared/utils/getCategoryTitle';
import { Dropdown } from '../shared/components/Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../shared/utils/searchHelper';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/api';
import { sortProducts } from '../shared/utils/sortProducts';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import { Pagination } from '../shared/components/Pagination/Pagination';

type Props = {
  category: string;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const currPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('perPage') || 'All';

  useEffect(() => {
    getProducts().then(fetchedProducts => setProducts(fetchedProducts));
  }, []);

  const filteredProducts = useMemo(
    () => products.filter(product => product.category === category),
    [products, category],
  );

  const visibleProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort],
  );

  const countVisibleProducts = useMemo(
    () => visibleProducts.length,
    [visibleProducts.length],
  );

  const itemsPerPage = useMemo(
    () => (perPage === 'All' ? countVisibleProducts : Number(perPage)),
    [perPage, countVisibleProducts],
  );

  const totalPages = useMemo(
    () =>
      itemsPerPage === 0 ? 1 : Math.ceil(countVisibleProducts / itemsPerPage),
    [countVisibleProducts, itemsPerPage],
  );

  const startIndex = useMemo(
    () => (currPage - 1) * itemsPerPage,
    [currPage, itemsPerPage],
  );

  const currentItems = useMemo(
    () =>
      perPage === 'All'
        ? visibleProducts
        : visibleProducts.slice(startIndex, startIndex + itemsPerPage),
    [perPage, visibleProducts, startIndex, itemsPerPage],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const updatedParams =
        page === 1 ? { page: null } : { page: String(page) };

      setSearchParams(getSearchWith(searchParams, updatedParams));
    },
    [searchParams, setSearchParams],
  );

  const title = getCategoryTitle(category);

  return (
    <div className={styles.products}>
      <Breadcrumbs />
      <div className={styles.products__content}>
        <h1 className={styles['products__content-title']}>{title}</h1>
        <p className={styles['products__content-count']}>
          {countVisibleProducts} models
        </p>

        <div className={styles.products__filters}>
          <Dropdown
            title="Sort by"
            options={['Newest', 'Alphabetically', 'Cheapest']}
            selected={sort}
            onChange={value =>
              setSearchParams(getSearchWith(searchParams, { sort: value }))
            }
          />

          <Dropdown
            title="Items on page"
            options={['4', '8', '16', 'All']}
            selected={perPage}
            onChange={value =>
              setSearchParams(
                getSearchWith(searchParams, { perPage: value, page: '1' }),
              )
            }
          />
        </div>

        <ProductsList products={currentItems} displayType="discount" />

        {perPage !== 'All' && totalPages > 1 && (
          <Pagination
            totalItems={countVisibleProducts}
            currPage={currPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
