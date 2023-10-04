import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setSearchQuery } from '../../redux/reducers/searchReducer';
import './SearchInput.scss';

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput:React.FC<SearchInputProps> = ({ placeholder }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const queryParams = searchParams.get('query') || '';

  useEffect(() => {
    dispatch(setSearchQuery(queryParams));
  }, [queryParams, dispatch]);

  /*   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  }; */

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQueryParams = event.target.value;

    searchParams.set('query', newQueryParams);
    navigate(`?${searchParams.toString()}`);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  return (
    <input
      type="search"
      className={classNames('input', { 'input__icon-hidden': isTyping })}
      placeholder={placeholder}
      onChange={handleSearchChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
};
