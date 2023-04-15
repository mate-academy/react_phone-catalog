import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getNumbers,
  numberOfPages,
  currentItems,
} from '../utils/paginationUtils';
import { sortedList, filteredList } from '../utils/orderedList';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { Pagination } from '../components/Pagination';
import { Select } from '../components/Select';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

import { PerPage } from '../types/PerPage';
import { SortBy } from '../types/SortBy';
import { SearchKey } from '../types/SearchKey';
import { usePhones } from '../hooks/usePhones';

export const PhonesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { phones, isErrorPhones, isPhonesLoading } = usePhones();
  const currentPage = searchParams.get(SearchKey.Page) || '1';
  const perPage = searchParams.get(SearchKey.Perpage) || PerPage.sixteen;
  const sortBy = searchParams.get(SearchKey.Sort) as SortBy;
  const querry = searchParams.get(SearchKey.Querry);

  const orderedList = useMemo(() => {
    return filteredList(sortedList(phones, sortBy), querry);
  }, [phones, sortBy, querry]);

  const pagesNumber = useMemo(() => {
    return getNumbers(
      1,
      numberOfPages(orderedList.length, perPage || PerPage.four),
    );
  }, [perPage, phones, orderedList]);

  const currentList = useMemo(() => {
    return currentItems(orderedList, +currentPage, perPage);
  }, [perPage, sortBy, currentPage, phones, orderedList]);

  return isPhonesLoading
    ? <Loader />
    : (
      <main className="phones-page">
        <Error isError={isErrorPhones} />
        <div className="phones-page__info-block">
          <Breadcrumbs productList={phones} />
          <div className="phone-page-title">
            <p className="phone-page-title__name">Mobile phones</p>
            <div className="phone-page-title__models-count">{`${phones.length} models`}</div>
          </div>
          <div className="phones-page__select-block">
            <Select
              options={Object.values(SortBy)}
              current={sortBy || SortBy.Newest}
              title="Sort by"
              searchPar="sort"
              isLong
            />
            <Select
              options={Object.values(PerPage)}
              current={perPage || PerPage.sixteen}
              title="Items on page"
              searchPar="perPage"
              isLong={false}
            />
          </div>
        </div>
        <ProductsList phones={currentList} />
        {!!pagesNumber.length && (
          <Pagination
            total={pagesNumber}
            currentPage={+currentPage}
          />
        )}
      </main>
    );
};
