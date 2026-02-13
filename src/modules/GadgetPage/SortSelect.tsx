/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './SortSelect.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const SortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const sortValue = searchParams.get('sort') || 'age';
  const handleSortParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', event?.target.value);
    setSearchParams(searchParams);
    selectRef.current?.blur();
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  return (
    <div className={style.wrapper}>
      <label className={style.name} htmlFor="Sort by">
        {t('sortBy')}
      </label>
      <div
        className={classNames(style.container, {
          [style.container__open]: isOpen,
        })}
      >
        <select
          ref={selectRef}
          id="Sort by"
          className={style.select}
          value={sortValue}
          onChange={handleSortParams}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
        >
          <option className={style.option} value="age">
            {t('newest')}
          </option>
          <option className={style.option} value="title">
            {t('alphabetically')}
          </option>
          <option className={style.option} value="price">
            {t('cheapest')}
          </option>
        </select>
      </div>
    </div>
  );
};
