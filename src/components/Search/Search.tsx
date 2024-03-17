import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useMediaQuery } from 'react-responsive';
import React, { useCallback, useEffect, useState } from 'react';
import './Search.scss';
import { SMALL_DESKTOP_WIDTH } from '../../helpers/constants';

type Props = {
  place: string;
};

export const Search: React.FC<Props> = ({ place }) => {
  const isDesktop = useMediaQuery({ minWidth: SMALL_DESKTOP_WIDTH });
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setIsSearchVisible(isDesktop);
  }, [isDesktop]);

  const setSearchWith = (currentQuery: string) => {
    const params = new URLSearchParams(searchParams);
    const newQuery = currentQuery.trim();

    if (params.get('perPage')) {
      params.set('page', '1');
    }

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      setSearchWith(newQuery);
    }, 1000), [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleInputClose = () => {
    setSearchQuery('');
    setSearchWith('');
    if (!isDesktop) {
      setIsSearchVisible(false);
    }
  };

  return (
    <div className="search">
      <div className="search__content">
        {isSearchVisible ? (
          <div className="search__bar">
            <input
              type="text"
              className="search__input"
              value={searchQuery}
              placeholder={`Search in ${place}...`}
              onChange={handleQueryChange}
            />
            {(searchQuery || !isDesktop) ? (
              <button
                type="button"
                className="search__button search__button--close"
                onClick={handleInputClose}
              >
                <div className="icon icon--cross" />
              </button>
            ) : (
              <button
                type="button"
                className="search__button"
                onClick={() => setIsSearchVisible(true)}
              >
                <div className="icon icon--search" />
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="search__button"
            onClick={() => setIsSearchVisible(true)}
          >
            <div className="icon icon--search" />
          </button>
        )}
      </div>
    </div>
  );
};
