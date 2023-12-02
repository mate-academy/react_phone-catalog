import {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { SearchStorageContext } from '../../context/SearchStorageContext';

import './Search.scss';

type Props = {
  placeholder: string;
};

export const Search: FC<Props> = ({ placeholder }) => {
  const [isSearching, setIsSearching] = useState(false);
  const { searchValue, onInputChange } = useContext(SearchStorageContext);
  const currentInput = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      const { value } = event.target;

      onInputChange(value);
    }
  };

  const handleRemove = () => {
    if (onInputChange) {
      onInputChange('');
    }

    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching && currentInput.current) {
      currentInput.current.focus();
    }
  }, [searchValue]);

  return (
    <div className="search">
      <p className="search__input-container">
        <input
          type="text"
          ref={currentInput}
          className="search__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />

        {!searchValue.length && <span className="search__icon" />}

        <button
          type="button"
          className={classNames(
            'search__delete',
            { 'search__delete--visible': !!searchValue.length },
          )}
          data-cy="searchDelete"
          aria-label="searchDelete"
          onMouseDown={handleRemove}
          tabIndex={0}
        />
      </p>
    </div>
  );
};
