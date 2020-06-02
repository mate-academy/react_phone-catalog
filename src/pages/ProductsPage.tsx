import React, { useMemo } from 'react';
import { useProductsList } from '../components/_hooks/useProductsList';
import { Heading } from '../components/Heading/Heading';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductsAmount } from '../components/ProductsAmount/ProductsAmount';
import {
  DROPDOWN_HEADINGS,
  SORT_TYPES,
  PER_PAGE, PRODUCT_PATHS, SECTION_HEADINGS, LOCATIONS,
} from '../common/constants';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { useRouter } from '../components/_hooks/useRouter';

export const ProductsPage = () => {
  const {
    numberOfProducts,
    changePage,
    perPage,
    page,
    search,
  } = useProductsList();

  const { location } = useRouter();

  // @ts-ignore
  const { pageHeading, productAmountTitle } = useMemo(() => {
    switch (location.pathname) {
      case LOCATIONS.phones:
        return {
          pageHeading: SECTION_HEADINGS.phones,
          productAmountTitle: PRODUCT_PATHS.phone,
        };
      case LOCATIONS.tablets:
        return {
          pageHeading: SECTION_HEADINGS.tablets,
          productAmountTitle: PRODUCT_PATHS.tablet,
        };
      default:
        return 'Products';
    }
  }, [location]);

  return (
    <div className="container">
      <section className="section">
        {!search.get('query') && (
          <>
            <Breadcrumbs />
            <Heading title={pageHeading} />
          </>
        )}
        {numberOfProducts !== 0 && (
          <ProductsAmount title={productAmountTitle} />
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
