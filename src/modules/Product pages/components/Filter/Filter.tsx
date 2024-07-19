import classNames from 'classnames';
import React from 'react';

interface Props {
  setSelectedSort: (sortCriteria: string) => void;
  setIsDropdownSortOpen: (isOpen: boolean) => void;
  setIsDropdownPerOpen: (isOpen: boolean) => void;
  selectedSort: string;
  isDropdownSortOpen: boolean;
  isDropdownPerOpen: boolean;
  setItemsPerPage: (perPage: string) => void;
  itemsPerPage: string;
  setCurrentPage: (page: number) => void;
  dropdownSortRef: React.RefObject<HTMLDivElement>;
  dropdownPerRef: React.RefObject<HTMLDivElement>;
  itemsPerPageOptions: string[];
}

export const Filter: React.FC<Props> = ({
  setSelectedSort,
  setIsDropdownSortOpen,
  setIsDropdownPerOpen,
  selectedSort,
  isDropdownSortOpen,
  isDropdownPerOpen,
  setItemsPerPage,
  itemsPerPage,
  itemsPerPageOptions,
  setCurrentPage,
  dropdownSortRef,
  dropdownPerRef,
}) => {
  const sortBy: string[] = ['Newest', 'Alphabetically', 'Cheapest'];

  const handleSortSelection = (sortCriteria: string) => {
    setSelectedSort(sortCriteria);
    setIsDropdownSortOpen(false);
    setIsDropdownPerOpen(false);
  };

  const handlePerPageSelection = (perPage: string) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
    setIsDropdownPerOpen(false);
    setIsDropdownSortOpen(false);
  };

  return (
    <div className="product__filter">
      <aside className="product__filter--sort-by" ref={dropdownSortRef}>
        <p className="product__filter--text">Sort by</p>
        <div className="product__dropdown-trigger">
          <button
            type="button"
            className="product__dropdown-button"
            aria-haspopup="true"
            aria-controls="product__dropdown-button"
            onClick={() => setIsDropdownSortOpen(!isDropdownSortOpen)}
          >
            <span>{selectedSort}</span>
            <img
              src={`img/links/${isDropdownSortOpen ? 'chevron (arrow up).svg' : 'chevron (arrow down).svg'}`}
              alt="chevron"
            />
          </button>
        </div>

        {isDropdownSortOpen && (
          <div
            className="product__dropdown-menu"
            id="dropdown-menu"
            role="menu"
          >
            <div className="product__dropdown-content">
              {sortBy.map((criteria, index) => (
                <a
                  key={index}
                  className={classNames('product__dropdown-item', {
                    'is-active': selectedSort === criteria,
                  })}
                  onClick={() => handleSortSelection(criteria)}
                >
                  {criteria}
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>
      <aside className="product__filter--per-page" ref={dropdownPerRef}>
        <p className="product__filter--text">Items on page</p>
        <div className="product__dropdown-trigger">
          <button
            type="button"
            className="product__dropdown-button"
            aria-haspopup="true"
            aria-controls="product__dropdown-button"
            onClick={() => setIsDropdownPerOpen(!isDropdownPerOpen)}
          >
            <span>{itemsPerPage}</span>
            <img
              src={`img/links/${isDropdownPerOpen ? 'chevron (arrow up).svg' : 'chevron (arrow down).svg'}`}
              alt="chevron"
            />
          </button>
        </div>

        {isDropdownPerOpen && (
          <div
            className="product__dropdown-menu"
            id="dropdown-menu"
            role="menu"
          >
            <div className="product__dropdown-content">
              {itemsPerPageOptions.map((perPage, index) => (
                <a
                  key={index}
                  className={classNames('product__dropdown-item', {
                    'is-active': itemsPerPage === perPage,
                  })}
                  onClick={() => handlePerPageSelection(perPage)}
                >
                  {perPage}
                  <br />
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
