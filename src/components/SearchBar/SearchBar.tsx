/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import cn from 'classnames';
import './style.scss';

type Props = {
  className: string
};

export const SearchBar: React.FC<Props> = ({ className }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={cn('search-bar', className)}>
      <input
        type="text"
        value={value}
        className="search-bar__input"
        placeholder="Search in phones..."
        onChange={handleChange}
      />

      <>
        {!value
          ? (
            <button
              type="button"
              className="search-bar__button"
            >
              <span
                className="search-bar__icon search-bar__icon--search"
              />
            </button>
          )
          : (
            <button
              type="button"
              className="search-bar__button"
              onClick={() => setValue('')}
            >
              <span
                className="search-bar__icon search-bar__icon--close"
              />

            </button>
          )}
      </>
    </div>
  );
};
