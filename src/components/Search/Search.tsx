import React, { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../helpers/searchHelper';
import { debounce } from '../../helpers/debounce';

import searchIcon from '../../images/search.svg';

import './Search.scss';

type Props = {
  setShowMobileMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Search: React.FC<Props> = ({ setShowMobileMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const [appliedQuery, setAppliedQuery] = useState(query);

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const applyQuery = useCallback(
    debounce(setSearchParams, 1000), [currentPath],
  );

  const handleShowMobileMenu = useCallback(
    debounce(() => {
      if (setShowMobileMenu) {
        setShowMobileMenu(false);
      }
    }, 1000), [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(getSearchWith(searchParams, {
      query: event.target.value || null,
      currentPage: '1',
    }));

    setAppliedQuery(event.target.value);
    handleShowMobileMenu();
  };

  const handleClearQuery = () => {
    setAppliedQuery('');

    setSearchParams(getSearchWith(searchParams, { query: null }));

    if (setShowMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${currentPath}...`}
        value={appliedQuery}
        onChange={(event) => handleQueryChange(event)}
      />
      <div className="Search__btn">
        {query ? (
          <button
            type="button"
            className="Search__delete"
            data-cy="searchDelete"
            onClick={handleClearQuery}
            aria-label="searchDelete"
          />
        ) : (
          <img src={searchIcon} alt="search" />
        )}
      </div>
    </div>
  );
};

Search.defaultProps = {
  setShowMobileMenu: undefined,
};
