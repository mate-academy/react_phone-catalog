/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import cn from 'classnames';

import { DeleteIcon, SearchIcon } from '../../icons';

type Props = {
  isLocation: boolean;
  query: string;
  setQuery: (value: React.ChangeEvent<HTMLInputElement>) => void;
  clearQuery: () => void;
  placeholder: string;
};

export const Search: FC<Props> = ({
  isLocation,
  query,
  setQuery,
  clearQuery,
  placeholder,
}) => {
  return (
    <>
      {isLocation && (
        <li
          className={cn(
            'main-header__search',
            { 'main-header__input-active': query.length > 0 },
          )}
        >
          <input
            className="main-header__input"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={setQuery}
          />
          {query.length > 0 ? (
            <p
              onClick={clearQuery}
              data-cy="searchDelete"
              className="main-header__delete"
            >
              <DeleteIcon color="#313237" />
            </p>
          ) : (
            <SearchIcon />
          )}
        </li>
      )}
    </>
  );
};
