import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';
import { SearchParams } from '../../types/SearchParams';
import './Filter.scss';
import React from 'react';
import { PerPage } from '../../types/PerPage';

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

  const handleItemsNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPerPage = event.target.value;

    if (newPerPage === `${DEF_DISPLAYED}`) {
      newParams.delete(SearchParams.PER_PAGE);
    } else {
      newParams.set(SearchParams.PER_PAGE, newPerPage);
    }

    setSearchParams(newParams);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;

    if (newSortBy === DEF_SORT) {
      newParams.delete(SearchParams.SORT_BY);
    } else {
      newParams.set(SearchParams.SORT_BY, newSortBy);
    }

    setSearchParams(newParams);
  };

  return (
    <div className="filter">
      <div className="filter__item">
        <label className="filter__name" htmlFor="sortBy">
          Sort by
        </label>
        <select
          className="filter__select"
          id="sortBy"
          value={sortBy}
          onChange={event => handleSortByChange(event)}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>

      <div className="filter__item filter__item--width--smaller">
        <label className="filter__name" htmlFor="itemsShown">
          Items on page
        </label>
        <select
          className="filter__select"
          id="itemsShown"
          value={itemsShownNumber}
          onChange={event => handleItemsNumberChange(event)}
        >
          <option value={PerPage.ALL}>All</option>
          <option value={PerPage.FOUR}>4</option>
          <option value={PerPage.EIGHT}>8</option>
          <option value={PerPage.SIXTEEN}>16</option>
        </select>
      </div>
    </div>
  );
};
