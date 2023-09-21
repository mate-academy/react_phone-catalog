import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setSearchQuery } from '../../redux/reducers/searchReducer';
import './SearchInput.scss';

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput:React.FC<SearchInputProps> = ({ placeholder }) => {
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
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
