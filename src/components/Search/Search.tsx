import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import cross from '../../images/icons/CrossBlack.svg';

import './Search.scss';

export const Search = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();
  const visibleLocations = ['phones', 'tablets', 'accessories', 'favourites'];
  const [inputData, setInputData] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setInputData(event.target.value);
    setSearchParams(`?query=${event.target.value}`);
  };

  const handleClick = () => {
    setInputData('');
    if (searchParams) {
      setSearchParams('');
    }
  };

  if (path && visibleLocations.includes(path)) {
    return (
      <div
        className={
          classNames(
            'Search',
            { 'Search--active': inputData },
          )
        }
      >
        {inputData
          && (
            <button
              type="button"
              className="Search__button"
              onClick={handleClick}
            >
              <img src={cross} alt="cross" />
            </button>
          )}
        <input
          type="text"
          className="Search__input"
          placeholder="Search in"
          value={inputData}
          onChange={handleChange}
        />
      </div>
    );
  }

  return null;
};
