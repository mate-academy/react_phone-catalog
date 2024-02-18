/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import './Search.scss';
import { SMALL_DESKTOP_WIDTH } from '../../helpers/constants';

export const Search = () => {
  const isDesktop = useMediaQuery({ minWidth: SMALL_DESKTOP_WIDTH });
  const [query, setQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    setIsSearchVisible(isDesktop);
  }, [isDesktop]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputClose = () => {
    if (isDesktop) {
      setQuery('');
    } else {
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
              value={query}
              placeholder="Search in phones..."
              onChange={handleInputChange}
            />
            {(query || !isDesktop) ? (
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
