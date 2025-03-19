/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Gadget } from '../shared/types/Gadget';
import style from './GadgetsCollection.module.scss';
import { ProductsList } from '../shared/ProductsList';
import { SortSelect } from './SortSelect';
import { ItemsPerPageSelect } from './ItemsPerPageSelect';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../shared/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

type Props = {
  gadgets: Gadget[];
  title: string;
  category: string;
};

export const GadgetsCollection: React.FC<Props> = ({
  gadgets,
  category,
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const perPage = searchParams.get('perPage') || 'all';
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;
  const itemsPerPage = perPage === 'all' ? gadgets.length : Number(perPage);
  const [searchValue, setSearchValue] = useState(query);
  const filteredGadgets = gadgets.filter(gadget =>
    gadget.name.toLowerCase().includes(query.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredGadgets.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleGadgets = filteredGadgets.slice(startIndex, endIndex);

  const updateSearchParams = debounce((value: string) => {
    if (value) {
      searchParams.set('query', value);
      searchParams.delete('page');
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  }, 500);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchValue(value);
    updateSearchParams(value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(newPage));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={style.collection}>
      <div className={style.collection__header}>
        <Link to="/">
          <img
            src={
              theme === 'light'
                ? './icons/home.png'
                : './icons/home-dark-theme.png'
            }
            alt="Back home"
          />
        </Link>
        <img src="./icons/arrow-right.png" alt="Gadgets" />
        <span className={style.collection__name}>
          {t(`categories.${category.toLowerCase()}`)}
        </span>
      </div>
      <h1 className={style.title}>{t(`categories.${title.toLowerCase()}`)}</h1>
      <p className={style.collection__quantity}>
        {gadgets.length} {t('items')}
      </p>
      <div className={style.collection__selects}>
        <div className={style.collection__selected}>
          <SortSelect />
          <ItemsPerPageSelect />
        </div>
        <div className={style.collection__wrapper}>
          <label className={style.collection__label} htmlFor="search">
            {t('enter name')}
          </label>
          <input
            type="text"
            id="search"
            placeholder={t('search')}
            value={searchValue}
            onChange={handleQueryChange}
            className={style.collection__query}
          />
        </div>
      </div>
      {filteredGadgets.length === 0 ? (
        <p className={style.collection__error}>
          {t(`no-item-${category.toLowerCase()}`)}
        </p>
      ) : (
        <ProductsList products={visibleGadgets} discount={true} />
      )}
      {totalPages > 1 && (
        <div className={style.pagination}>
          <button
            className={style.pagination__prev}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <img
              className={style.pagination__arrow}
              src="./icons/arrow-left-dark.png"
              alt="Back"
            />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={classNames(style.pagination__button, {
                [style['pagination__button--active']]: page === i + 1,
              })}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={style.pagination__next}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <img
              className={style.pagination__arrow}
              src="./icons/arrow-right-dark.png"
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
