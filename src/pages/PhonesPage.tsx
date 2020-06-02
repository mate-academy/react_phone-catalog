import React from 'react';
import { useProductsList } from '../components/_hooks/useProductsList';
import { Heading } from '../components/Heading/Heading';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductsAmount } from '../components/ProductsAmount/ProductsAmount';
import {
  DROPDOWN_HEADINGS,
  SORT_TYPES,
  PER_PAGE, PRODUCT_PATHS, SECTION_HEADINGS,
} from '../common/constants';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { ProductsList } from '../components/ProductsList/ProductList';

export const PhonesPage = () => {
  const {
    numberOfProducts,
    changePage,
    perPage,
    page,
    search,
  } = useProductsList();

  return (
    <div className="container">
      <section className="section">
        {!search.get('query') && (
          <>
            <Breadcrumbs />
            <Heading title={SECTION_HEADINGS.phones} />
          </>
        )}
        {numberOfProducts !== 0 && (
          <ProductsAmount title={PRODUCT_PATHS.phone} />
        )}
        {!search.get('query') && (
          <div className="section__dropdowns">
            <Dropdown
              heading={DROPDOWN_HEADINGS.sortBy}
              list={SORT_TYPES}
            />
            <Dropdown
              heading={DROPDOWN_HEADINGS.perPage}
              list={PER_PAGE}
            />
          </div>
        )}
        <ProductsList />
        {numberOfProducts > perPage && (
          <Pagination
            total={numberOfProducts}
            perPage={perPage}
            page={page}
            changePage={changePage}
          />
        )}
      </section>
    </div>
  );
};
