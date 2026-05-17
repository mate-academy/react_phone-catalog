import './Filter.scss';
import Arrow from '../../images/icons/arrow-down.svg';
import React from 'react';

export type FilterValue =
  | 'Newest'
  | 'Popular'
  | 'Price: Low to High'
  | 'Price: High to Low';

export type ItemQuantity = 16 | 32 | 64;

type FilterProps = {
  activeQuantity: ItemQuantity;
  setActiveQuantity: (quantity: ItemQuantity) => void;
  activeFilter: FilterValue;
  setActiveFilter: (filter: FilterValue) => void;
};

export const Filter = ({
  activeFilter,
  setActiveFilter,
  activeQuantity,
  setActiveQuantity,
}: FilterProps) => {
  const [isOptionsActive, setIsOptionsActive] = React.useState(false);
  const [isNumberOptionsActive, setIsNumberOptionsActive] =
    React.useState(false);

  return (
    <div className="filter">
      <div className="filter__newest">
        <div className="filter__newest-title">Sort by</div>
        <button
          onClick={() => setIsOptionsActive(!isOptionsActive)}
          type="button"
          className={`filter__newest-checkbox ${isOptionsActive ? 'filter__newest-checkbox-active' : ''}`}
        >
          <div className="filter__newest-option">
            <span className="filter__newest-option-text">{activeFilter}</span>
            <img
              src={Arrow}
              alt="Arrow"
              className={`filter__newest-option-arrow ${isOptionsActive ? 'filter__newest-option-arrow-active' : ''}`}
            />
          </div>
        </button>
        <div
          className={`filter__options ${isOptionsActive ? 'filter__options-active' : ''}`}
        >
          <button
            type="button"
            onClick={() => setActiveFilter('Newest')}
            className="filter__option filter__option-first"
          >
            <span className="filter__option-text">Newest</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Popular')}
            className="filter__option"
          >
            <span className="filter__option-text">Popular</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Price: Low to High')}
            className="filter__option filter__option-last"
          >
            <span className="filter__option-text">Price: Low to High</span>
          </button>
          <button
            onClick={() => setActiveFilter('Price: High to Low')}
            type="button"
            className="filter__option filter__option-last"
          >
            <span className="filter__option-text">Price: High to Low</span>
          </button>
        </div>
      </div>

      <div className="filter__newest">
        <div className="filter__newest-title">Items on page</div>
        <button
          onClick={() => setIsNumberOptionsActive(!isNumberOptionsActive)}
          type="button"
          className={`filter__newest-checkbox filter__newest-checkbox-number ${isNumberOptionsActive ? 'filter__newest-checkbox-active' : ''}`}
        >
          <div className="filter__newest-option">
            <span className="filter__newest-option-text">{activeQuantity}</span>
            <img
              src={Arrow}
              alt="Arrow"
              className={`filter__newest-option-arrow ${isNumberOptionsActive ? 'filter__newest-option-arrow-active' : ''}`}
            />
          </div>
        </button>
        <div
          className={`filter__options filter__options-number ${isNumberOptionsActive ? 'filter__options-active' : ''}`}
        >
          <button
            type="button"
            className="filter__number-option filter__number-option-first"
            onClick={() => setActiveQuantity(16)}
          >
            <span className="filter__number-option-text">16</span>
          </button>
          <button
            type="button"
            className="filter__number-option"
            onClick={() => setActiveQuantity(32)}
          >
            <span className="filter__number-option-text">32</span>
          </button>
          <button
            type="button"
            className="filter__number-option filter__number-option-last"
            onClick={() => setActiveQuantity(64)}
          >
            <span className="filter__number-option-text">64</span>
          </button>
        </div>
      </div>
    </div>
  );
};
