import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';
import { SearchParams } from '../../types/SearchParams';
import './Filter.scss';
import React from 'react';
import { PerPage } from '../../types/PerPage';
import { Select } from '../Select';

type Props = {
  DEF_SORT?: SortBy;
  DEF_DISPLAYED?: PerPage;
};

export const Filter: React.FC<Props> = ({
  DEF_SORT = SortBy.NEWEST,
  DEF_DISPLAYED = PerPage.EIGHT,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy: string = searchParams.get(SearchParams.SORT_BY) ?? DEF_SORT;
  const itemsShownNumber: number = +(
    searchParams.get(SearchParams.PER_PAGE) ?? DEF_DISPLAYED
  );
  const newParams = new URLSearchParams(searchParams);

  const handleItemsNumberChange = (newValue: string | number) => {
    const newPerPage = `${newValue}`;

    if (newPerPage === `${DEF_DISPLAYED}`) {
      newParams.delete(SearchParams.PER_PAGE);
    } else {
      newParams.set(SearchParams.PER_PAGE, newPerPage);
    }

    setSearchParams(newParams);
  };

  const handleSortByChange = (newValue: string | number) => {
    const newSortBy = `${newValue}`;

    if (newSortBy === DEF_SORT) {
      newParams.delete(SearchParams.SORT_BY);
    } else {
      newParams.set(SearchParams.SORT_BY, newSortBy);
    }

    setSearchParams(newParams);
  };

  const sortValues = {
    age: 'Newest',
    title: 'Alphabetically',
    price: 'Cheapest',
  };

  const perPageValues = {
    [PerPage.ALL]: 'All',
    [PerPage.EIGHT]: '8',
    [PerPage.FOUR]: '4',
    [PerPage.SIXTEEN]: '16',
  };

  return (
    <div className="filter">
      <div className="filter__item">
        <Select
          values={sortValues}
          currentValue={sortBy}
          handleChange={handleSortByChange}
        />
      </div>

      <div className="filter__item filter__item--width--smaller">
        <Select
          values={perPageValues}
          currentValue={itemsShownNumber}
          handleChange={handleItemsNumberChange}
        />
      </div>
    </div>
  );
};
