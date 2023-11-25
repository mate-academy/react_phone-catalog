/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import {
  useCallback, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Search_icon from '../../icons/Search.svg';
import Cross from '../../icons/Cross.svg';
import './Search.scss';
import { getSearchWith } from '../../helpers/getSearch';
import { useAppDispatch } from '../../features/hooks';
import { setSearch } from '../../features/search/search';

type Props = {
  title?: string;
};

const Search:React.FC<Props> = ({ title }) => {
  const [searchValue, setSearchValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  // console.log(searchParams);
  // eslint-disable-next-line

  // const search = searchParams.get('query') || '';

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
      setSearchParams(getSearchWith({ query: str }, searchParams));

      if (!str) {
        setSearchParams(getSearchWith({ query: null }, searchParams));
        dispatch(setSearch(''));
      }
    }, 1000),
    [],
  );

  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearch(''));
    setSearchValue('');
    setSearchParams(getSearchWith({ query: null }, searchParams));
  };

  // if (searchValue.length === 0) {
  //   setSearchParams(getSearchWith({ query: null }, searchParams));
  // }

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        className="search__input"
        placeholder={`Search in ${title}`}
        onChange={onChangeInput}
      />
      {searchValue ? (
        <img
          src={Cross}
          alt=""
          onClick={onClickClear}
          className="search__img"
        />
      ) : (
        <img
          src={Search_icon}
          alt=""
          className="search__img"
        />
      )}
    </div>
  );
};

export default Search;
