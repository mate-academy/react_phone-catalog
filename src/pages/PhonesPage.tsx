import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getNumbers,
  numberOfPages,
  currentItems,
} from '../utils/paginationUtils';
import { getPhonesList } from '../api';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { Pagination } from '../components/Pagination';
import { Select } from '../components/Select';
import { Loader } from '../components/Loader';

import { Phone } from '../types/Phone';
import { PerPage } from '../types/PerPage';
import { SortBy } from '../types/SortBy';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || PerPage.sixteen;
  const sortBy = searchParams.get('sort');

  const sortedList = useMemo(() => {
    switch (sortBy) {
      case SortBy.Alphabetically:
        return [...phones].sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.Cheapest:
        return [...phones].sort((a, b) => a.price - b.price);
      default:
        return [...phones].sort((a, b) => b.year - a.year);
    }
  }, [phones, sortBy]);

  useEffect(() => {
    getPhonesList()
      .then(resolve => setPhones(resolve));
  }, []);

  const pagesNumber
  = useMemo(() => {
    return getNumbers(1, numberOfPages(phones.length, perPage || PerPage.four));
  }, [perPage, phones]);

  const currentList = useMemo(() => {
    return currentItems(sortedList, +currentPage, perPage);
  }, [perPage, sortBy, currentPage, phones]);

  return !phones.length
    ? <Loader />
    : (
      <div className="phones-page">
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
        <Pagination
          total={pagesNumber}
          currentPage={+currentPage}
        />
      </div>
    );
};
