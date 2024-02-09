import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

import './Phones.scss';
import { usePhones } from '../../hooks/usePhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { Dropdown } from '../../components/Dropdown/Dropdown';

export const Phones: React.FC = () => {
  const {
    sortType,
    sortParams,
    perPageParams,
    setSortType,
    setItemsPerPage,
    itemsPerPage,
    phonesData,
    filteredProducts,
  } = usePhones();

  const [currentPage, setCurrentPage] = useState(1);

  const productsLength = filteredProducts.length;

  const lastProductIndex = currentPage * itemsPerPage;
  const firstProductIndex = lastProductIndex - itemsPerPage;

  const slicedProducts = filteredProducts
    .slice(firstProductIndex, lastProductIndex);

  return (
    <div className="phones">
      <div className="phones__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="phones__title">
        Mobile phones
      </h1>

      <p className="phones__count">
        {`${phonesData.length} models`}
      </p>

      <section className="section section__phones-pagination">
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
      </section>
    </div>
  );
};
