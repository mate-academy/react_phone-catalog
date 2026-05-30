import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import style from './Dropdown.module.scss';
import { PerPageOption, SortOption } from '../../../../types/Types';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  label: string;
  options: SortOption[] | PerPageOption[];
  type: 'sort' | 'perPage' | '';
};

export const Dropdown: React.FC<Props> = ({ label, options, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const dropdown = useRef<HTMLDivElement>(null);

  const typeSort = searchParams.get(`${type}`);

  useEffect(() => {
    const handlClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlClickOutside);

    return () => document.removeEventListener('mousedown', handlClickOutside);
  }, []);

  const valueButton = () => {
    const value = typeSort
      ? options.find(el => el.value === typeSort)?.name
      : type === 'perPage'
        ? 'All'
        : 'Choose a filter';

    return value;
  };

  return (
    <div ref={dropdown} className={style.dropdown}>
      <span className={style.dropdown__label}>{label}</span>

      <div className={style.dropdown__trigger}>
        <button
          className={classNames(style.dropdown__button, {
            [style['dropdown__button--active']]: isOpen,
          })}
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
        >
          <span className={style.dropdown__buttonValue}>{valueButton()}</span>
          <span className={style.dropdown__arrow}>
            <Icon
              className={classNames(style.dropdown__icon, {
                [style['dropdown__icon--up']]: isOpen,
              })}
              nameIcon="right"
            />
          </span>
        </button>
      </div>

      <div
        className={classNames(style.dropdown__menu, {
          [style['dropdown__menu--open']]: isOpen,
        })}
        role="menu"
      >
        <div className={style.dropdown__content}>
          <ul className={style.dropdown__list}>
            {options.map(option => (
              <li key={option.name} className={style.dropdown__item}>
                <Link
                  onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
                  className={classNames(style.dropdown__link, {
                    [style['dropdown__link--active']]:
                      typeSort === option.value,
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      [type]: option.value,
                      page: null,
                    }),
                  }}
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
