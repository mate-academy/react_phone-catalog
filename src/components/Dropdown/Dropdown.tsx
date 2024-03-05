import './Dropdown.scss';
import cn from 'classnames';
import { useState } from 'react';
import { PaginationList, SortList } from '../../type/Sort';
import { getSearchWith } from '../../utils/search';

type Props = {
  list: SortList | PaginationList;
  searchParams: URLSearchParams;
  setSearchParams: (param: URLSearchParams) => void;
  slug: string;
  label: string;
  size?: string;
  title: string;
};

export const Dropdown: React.FC<Props> = ({
  list,
  searchParams,
  setSearchParams,
  slug,
  label,
  size,
  title,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  function setSearchWith(params: Record<string, string | null>) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const toggleOption = (option: string) => {
    setIsActiveDropdown(!isActiveDropdown);
    setSearchWith({ [`${slug}`]: option || null, page: null });
  };

  return (
    <div
      className={cn('dropdown', {
        'dropdown dropdown--small': size === 'smal',
        'dropdown--active': isActiveDropdown,
      })}
    >
      <p className="dropdown__label">{label}</p>

      <button
        type="button"
        className="dropdown__button"
        onClick={() => setIsActiveDropdown(!isActiveDropdown)}
      >
        <span className="dropdown__button-title">{title}</span>
        <span className="dropdown__arrow-down-chevron" />
      </button>

      <div className="dropdown__content">
        <ul className="dropdown__link">
          {Object.entries(list).map(([key, value]) => (
            <li key={key} className="dropdown__item">
              <button
                aria-label={`${key}`}
                type="button"
                className="dropdown__option"
                onClick={() => {
                  toggleOption(key);
                }}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
