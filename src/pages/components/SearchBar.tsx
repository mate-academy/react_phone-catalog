/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setSearchingValue, unsetSearchingValue,
} from '../../features/SearchBar/searchBarSlice';
import '../../styles/styles.scss';
import { searchBarSelector } from '../../app/selector';

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchValue = useAppSelector(searchBarSelector);
  const [valueInput, setValueInput] = useState('');

  const handleSearchCheange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setSearchingValue(event.target.value));
    setValueInput(event.target.value);
  };

  const clearSearch = () => {
    if (searchValue) {
      dispatch(unsetSearchingValue());
      setValueInput('');
    }
  };

  const iconShowSearchClear = searchValue
    ? 'images/icons/CloseButtonDark.svg'
    : 'images/icons/Search.svg';

  return (
    <div className="search-bar">
      <input
        className="search-bar__search-bar-input"
        type="text"
        name="search"
        id="search"
        value={valueInput}
        placeholder={
          location.pathname === '/favorites'
            ? 'Search in favourites...'
            : 'Search in phones...'
        }
        onChange={handleSearchCheange}
      />
      <button
        className="search-bar__clear-button"
        onClick={clearSearch}
        type="button"
      >
        <img
          src={iconShowSearchClear}
          alt="Close"
        />
      </button>
    </div>
  );
};
