import classNames from 'classnames';
import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import './Search.scss';
import { SearchContext } from '../../Context/SearchContext';

type Props = {
  placeholder: string;
};

export const Search: FC<Props> = ({
  placeholder,
}) => {
  const { searchValue, onInputChange } = useContext(SearchContext);
  const currentInput = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

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
          data-cy="NameFilter"
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
