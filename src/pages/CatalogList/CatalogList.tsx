import React, { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

import { sortByProducts } from '../../utils/sortByProducts';
import { filterByCategory } from '../../utils/filterByCategory';

import './CatalogList.scss';
import {
  CatalogListMenu,
} from '../../components/CatalogListMenu/CatalogListMenu';

type Props = {
  title: string;
};

export const CatalogList: React.FC<Props> = ({ title }) => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [countShow, setCountShow] = useState('100');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newset');
  const query = searchParams.get('query')?.toString() || '';

  const filteredProducts = useMemo(() => {
    return filterByCategory(products, pathname, query);
  }, [pathname, query]);

  const sortedProduct = useMemo(() => {
    return sortByProducts(filteredProducts, sortBy);
  }, [sortBy]);

  const visibleProducts = sortedProduct.slice(
    (page - 1) * +countShow, +countShow * page,
  );

  return (
    <>
      <main>
        <div className="catalog-list container">
          <Breadcrumbs />
          <h1 className="catalog-list__title">{title}</h1>
          {visibleProducts.length > 0 ? (
            <>
              <p className="catalog-list__count">{`${visibleProducts.length} models`}</p>

              <CatalogListMenu
                countShow={countShow}
                setCountShow={setCountShow}
                setPage={setPage}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
              <div className="catalog-list__content">
                {visibleProducts.map(p => (

                  <ProductCard product={p} key={p.id} />
                ))}
              </div>
            </>
          ) : (
            <h2>{`${title} not found`}</h2>
          )}
          {+countShow < filteredProducts.length && (
            <Pagination
              total={filteredProducts.length}
              step={+countShow}
              page={page}
              changePage={setPage}
            />
          )}
        </div>
      </main>
    </>
  );
};
