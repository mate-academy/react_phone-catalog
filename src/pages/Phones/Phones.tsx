import React, { useEffect, useState } from 'react';

import './Phones.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { usePhones } from '../../hooks/usePhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';

export const Phones: React.FC = () => {
  const {
    sortType,
    sortParams,
    perPageParams,
    setSortType,
    setItemsPerPage,
    itemsPerPage,
    products,
    setProducts,
    filteredProducts,
  } = usePhones();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsLength = filteredProducts.length;

  const lastProductIndex = currentPage * itemsPerPage;
  const firstProductIndex = lastProductIndex - itemsPerPage;

  const slicedProducts = filteredProducts
    .slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    if (!products.length) {
      setIsLoading(true);

      client.get<Product[]>('products.json')
        .then(setProducts)
        .finally(() => setIsLoading(false));
    }
  }, [products, setProducts]);

  return (
    <div className="phones">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="phones__breadcrumbs">
            <Breadcrumbs />
          </div>

          <h1 className="content__title">
            Mobile phones
          </h1>

          <p className="phones__count">
            {`${products.length} models`}
          </p>

          <section className="section section__phones-pagination">
            {!filteredProducts.length && (
              <p className="content__not-fount">
                Products not found
              </p>
            )}

            {!!filteredProducts.length && (
              <>
                <div className="pagination__sort-params">
                  <Dropdown
                    title="Sort by"
                    sortParams={sortParams}
                    sortType={sortType}
                    setSortType={setSortType}
                  />
                  <Dropdown
                    title="Items on page"
                    perPageParams={perPageParams}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={(i) => {
                      setItemsPerPage(i);
                      setCurrentPage(1);
                    }}
                    isItemsPerPage
                    isSmall
                  />
                </div>

                <Pagination
                  productsLength={productsLength}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  products={slicedProducts}
                />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};
