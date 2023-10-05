import { useEffect, useRef, useState } from 'react';
import { SearchLink } from '../SearchLink';
import { Pagination, SortBy } from '../../types';
import './Filters.scss';

type Props = {
  sortBy: string
  updatePageHeight: () => void;
  pagesOnSite: string;
  setSortBy: (value: string) => void;
  setPaginationNumber: (value: number) => void;
  setPagesOnSite: (value: string) => void;
};

export const Filters: React.FC<Props> = ({
  sortBy,
  updatePageHeight,
  pagesOnSite,
  setSortBy,
  setPaginationNumber,
  setPagesOnSite,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownPagination, setShowDropdownPagination] = useState(false);

  const dropdownButtonRef = useRef(null);
  const dropdownPaginationRef = useRef(null);

  useEffect(() => {
    updatePageHeight();

    const handlePageClick = (e: MouseEvent) => {
      if (
        dropdownButtonRef.current
        && (dropdownButtonRef.current as HTMLElement).contains(e.target as Node)
      ) {
        return;
      }

      if (
        dropdownPaginationRef.current
        && (dropdownPaginationRef.current as HTMLElement)
          .contains(e.target as Node)
      ) {
        return;
      }

      setShowDropdown(false);
      setShowDropdownPagination(false);
    };

    window.addEventListener('click', handlePageClick);

    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, [updatePageHeight, pagesOnSite]);

  const setSort = (value: SortBy) => {
    setSortBy(value);
    setShowDropdown(false);
    setPaginationNumber(1);
  };

  const setPagination = (value: string) => {
    setPagesOnSite(value);
    setShowDropdownPagination(false);
    setPaginationNumber(1);
  };

  return (
    <div
      className="filters-container
            phones-page-container__filters-container"
    >
      <div className="filters-container__filtr-container">
        <p className="icon-navigation-text">Sort by</p>
        <button
          type="button"
          className="filtr filters-container__filtr"
          onClick={() => {
            setShowDropdown(!showDropdown);
            setShowDropdownPagination(false);
          }}
          style={{
            backgroundImage: showDropdown
              ? 'url(./img/icons/arrowup.svg)'
              : 'url(./img/icons/arrowdown.svg)',
          }}
          ref={dropdownButtonRef}
        >
          {sortBy}
        </button>
        {showDropdown && (
          <div
            className="sort-container
                  phones-page-container__sort-container"
          >
            <SearchLink
              params={{ sort: 'age', page: '1' }}
              type="button"
              className="filtr filtr--dropdown"
              onClick={() => setSort(SortBy.age)}
            >
              Newest
            </SearchLink>
            <SearchLink
              params={{ sort: 'name', page: '1' }}
              type="button"
              className="filtr filtr--dropdown"
              onClick={() => setSort(SortBy.name)}
            >
              Alphabetically
            </SearchLink>
            <SearchLink
              params={{ sort: 'price', page: '1' }}
              type="button"
              className="filtr filtr--dropdown"
              onClick={() => setSort(SortBy.price)}
            >
              Cheapest
            </SearchLink>
          </div>
        )}
      </div>

      <div className="filters-container__filtr-container">
        <p className="icon-navigation-text">Items on page</p>
        <button
          type="button"
          className="filtr filters-container__filtr filtr--pagination"
          onClick={() => {
            setShowDropdownPagination(!showDropdownPagination);
            setShowDropdown(false);
          }}
          style={{
            backgroundImage: showDropdownPagination
              ? 'url(./img/icons/arrowup.svg)'
              : 'url(./img/icons/arrowdown.svg)',
          }}
          ref={dropdownPaginationRef}
        >
          {pagesOnSite}
        </button>
        {showDropdownPagination && (
          <div
            className="sort-container
                  phones-page-container__sort-container"
          >
            <SearchLink
              params={{ perPage: Pagination.four, page: '1' }}
              type="button"
              className="filtr filtr--dropdown filtr--pagination-dropdown"
              onClick={() => setPagination(Pagination.four)}
            >
              4
            </SearchLink>
            <SearchLink
              params={{ perPage: Pagination.eight, page: '1' }}
              type="button"
              className="filtr filtr--dropdown filtr--pagination-dropdown"
              onClick={() => setPagination(Pagination.eight)}
            >
              8
            </SearchLink>
            <SearchLink
              params={{ perPage: Pagination.sixteen, page: '1' }}
              type="button"
              className="filtr filtr--dropdown filtr--pagination-dropdown"
              onClick={() => setPagination(Pagination.sixteen)}
            >
              16
            </SearchLink>
            <SearchLink
              params={{ perPage: null, page: null }}
              type="button"
              className="filtr filtr--dropdown filtr--pagination-dropdown"
              onClick={() => setPagination(Pagination.all)}
            >
              all
            </SearchLink>
          </div>
        )}
      </div>
    </div>
  );
};
