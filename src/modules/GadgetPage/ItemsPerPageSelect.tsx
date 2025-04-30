/* eslint-disable import/no-extraneous-dependencies */
import { useSearchParams } from 'react-router-dom';
import style from './ItemsPerPageSelect.module.scss';
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const ItemsPerPageSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const perPage = searchParams.get('perPage') || 'all';

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    if (newPerPage === 'all') {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', newPerPage);
    }

    setSearchParams(searchParams);
    selectRef.current?.blur();
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  return (
    <div className={style.container}>
      <label htmlFor="itemsPerPage" className={style.label}>
        {t('itemsOnPage')}
      </label>
      <div
        className={classNames(style.wrapper, { [style.wrapper__open]: isOpen })}
      >
        <select
          ref={selectRef}
          id="itemsPerPage"
          className={style.select}
          value={perPage}
          onChange={handlePerPageChange}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
        >
          <option className={style.option} value="4">
            4
          </option>
          <option className={style.option} value="8">
            8
          </option>
          <option className={style.option} value="16">
            16
          </option>
          <option className={style.option} value="all">
            {t('all')}
          </option>
        </select>
      </div>
    </div>
  );
};
