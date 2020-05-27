import React from 'react';
import cn from 'classnames';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { useProductsList } from '../components/_hooks/useProductsList';
import { Heading } from '../components/Heading/Heading';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductsAmount } from '../components/ProductsAmount/ProductsAmount';
import {
  DROPDOWN_HEADINGS,
  SORT_TYPES,
  PER_PAGE,
} from '../helpers/storage';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const PhonesPage = () => {
  const {
    numberOfProducts,
    changePage,
    perPage,
    page,
    search,
    location,
  } = useProductsList();

  return (
    <div className="container">
      <section className={cn({
        section: true,
        pt24: location.pathname !== '/',
      })}
      >
        {!search.get('query') && <>
        <Breadcrumbs />
        <Heading title="Mobile phones" /> </>}
        {numberOfProducts !== 0 && (
          <ProductsAmount title="phones" />
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
