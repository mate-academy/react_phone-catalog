import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Phones.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { usePhones } from '../../hooks/usePhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';
import { SortType } from '../../types/SortType';
import { PhonesList } from '../../components/PhonesList/PhonesList';

export const Phones: React.FC = () => {
  const {
    sortParams,
    perPageParams,
    products,
    setProducts,
  } = usePhones();

  const [searchParams] = useSearchParams();

  const phoneSearchValue = searchParams.get('phoneSearchValue') || '';
  const itemsPerPage = +(searchParams.get('perPage') || 32);
  const sortType = searchParams.get('sortType') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getSortedProducts = () => {
    switch (sortType as SortType) {
      case SortType.Alphabetically:
        return [...products].sort((prev, next) => (
          next.name.localeCompare(prev.name)
        ));

      case SortType.Cheapest:
        return [...products]
          .sort((prev, next) => prev.fullPrice - next.fullPrice);

      default:
        return [...products].sort((prev, next) => next.year - prev.year);
    }
  };

  const filteredProducts = getSortedProducts().filter(product => (
    product.name.toLowerCase().trim()
      .includes(phoneSearchValue.toLowerCase().trim())
  ));

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
                  />
                  <Dropdown
                    title="Items on page"
                    perPageParams={perPageParams}
                    setCurrentPage={setCurrentPage}
                    isItemsPerPage
                    isSmall
                  />
                </div>

                <PhonesList
                  products={slicedProducts}
                />

                <Pagination
                  productsLength={productsLength}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};
