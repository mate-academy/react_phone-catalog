/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useEffect, useState } from 'react';
import './SortDropdown.scss';
import { icons } from '../../../../../global-assets/static';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SortOption } from '../../../../../i18next/types/SortOption';
import { SortType } from '../../../../shared/types/Sort';
import { SortContext } from '../../../../shared/context/SortContext';

type SortDropdownProps = {
  content: {
    title: string;
    typeOfSort: SortType['sort'];
    options: SortOption[];
  };
};

export const SortDropdown: React.FC<SortDropdownProps> = React.memo(
  ({ content }) => {
    const IconArrowDown = icons.arrowDown.valuePath;
    const location = useLocation();
    const { setSearchWith } = useContext(SortContext);
    const [contentIsActive, setContentIsActive] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const sortValue = searchParams.get('sort') || 'year';
    const perPageValue = searchParams.get('perPage') || 'all';

    useEffect(() => {
      setContentIsActive(false);
    }, [location, sortValue]);

    const getDropdownContent = () => {
      setContentIsActive(!contentIsActive);
    };

    const handleSort = (sort: string) => {
      setSearchWith({ sort: sort, page: '1' }, searchParams);
    };

    const handleSortPerPage = (perPage: string) => {
      setSearchWith({ perPage: perPage }, searchParams);
    };

    const currentValue =
      content.typeOfSort === 'sortBy'
        ? content.options.find(option => option.sortKey === sortValue)?.label
        : content.options.find(option => option.sortKey === perPageValue)
            ?.label;

    return (
      <div className="dropdown">
        <span className="dropdown__title">{content.title}</span>
        <div className="dropdown__content-wrapper">
          <button className="dropdown__trigger" onClick={getDropdownContent}>
            <IconArrowDown className="dropdown__trigger-icon" />
            <span className="dropdown__current-value">
              {currentValue || content.options[0].label}
            </span>
          </button>

          <div
            className={classNames('dropdown__content', {
              'dropdown__content--active': contentIsActive,
            })}
          >
            <ul className="content">
              {content.options
                .filter(i => i.label !== content.title)
                .map(sortItem => (
                  <button
                    key={sortItem.label}
                    className="content__item"
                    onClick={
                      content.typeOfSort === 'sortBy'
                        ? () => handleSort(sortItem.sortKey)
                        : () => handleSortPerPage(sortItem.sortKey)
                    }
                  >
                    <li key={sortItem.label}>{sortItem.label}</li>
                  </button>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
);

SortDropdown.displayName = 'SortDropdown';
