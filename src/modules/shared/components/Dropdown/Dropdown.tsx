import React, { useEffect, useState } from 'react';
import './Dropdown.scss';
import { icons } from '../../../../global-assets/static';
import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SortOption } from '../../../../i18next/types/SortOption';
import { SortType } from '../../types/Sort';

type DropdownProps = {
  content: {
    title: string;
    typeOfSort: SortType['sort'];
    options: SortOption[];
  };
};

export const Dropdown: React.FC<DropdownProps> = React.memo(({ content }) => {
  const IconArrowDown = icons.arrowDown.valuePath;
  const location = useLocation();
  const navigate = useNavigate();
  const [contentIsActive, setContentIsActive] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort') || 'year';
  const [perPageValue, setPerPageValue] = useState(() => {
    return location.state?.perPage || 'all';
  });

  useEffect(() => {
    setContentIsActive(false);
  }, [location, sortValue]);

  const getDropdownContent = () => {
    setContentIsActive(!contentIsActive);
  };

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    setSearchParams(params);

    navigate(`.?${params.toString()}`, {
      state: {
        ...location.state,
        perPage: location.state?.perPage || 'all',
        page: 1,
      },
    });
  };

  const handleSortPerPage = (perPage: string) => {
    setPerPageValue(perPage);

    navigate(`.?${searchParams.toString()}`, {
      state: {
        ...location.state,
        perPage: perPage,
        page: 1,
      },
    });
  };

  const currentValue =
    content.typeOfSort === 'sortBy'
      ? content.options.find(option => option.sortKey === sortValue)?.label
      : content.options.find(option => option.sortKey === perPageValue)?.label;

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
        {/* content */}
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
});

Dropdown.displayName = 'Dropdown';
