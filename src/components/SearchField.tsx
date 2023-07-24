import React, { ChangeEvent, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import searchIcon from '../imgs/icons/Search.svg';
import cross from '../imgs/icons/Close.svg';

const types = ['/phones', '/tablets', '/accessories', '/favorites'];

export const SearchField: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [params, setParams] = useSearchParams();

  const location = useLocation();

  const { t, i18n } = useTranslation();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);
    setParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (query) {
        newParams.set('query', query);
      } else {
        newParams.delete('query');
      }

      return newParams;
    });
  };

  const handleResetQuery = () => {
    setSearchQuery('');
    setParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  };

  useEffect(() => {
    const isCategory = types.find(category => category === location.pathname);

    if (isCategory) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (!searchQuery) {
      setParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);

        newParams.delete('query');

        return newParams;
      });
    }
  }, [params, location.pathname]);

  const getCorrectCategory = () => {
    const category = location.pathname.slice(1).toLowerCase();

    return i18n.language === 'en'
      ? category
      : `${t(`${category}`).slice(0, -1)}ax`.toLowerCase();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="SearchField">
      {!!searchQuery.length && (
        <button
          type="button"
          onClick={() => handleResetQuery()}
        >
          <img src={cross} alt="close" />
        </button>
      )}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder={t('search', { category: getCorrectCategory() })}
        className="SearchField__input"
      />
      <img src={searchIcon} alt="search" />
    </div>
  );
};
