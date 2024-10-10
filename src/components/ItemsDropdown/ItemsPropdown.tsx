import './ItemsDropdown.scss';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';

const options: string[] = ['4', '8', '16', 'All'];

export const ItemsDropdown = () => {
  const [isActive, setIsActive] = useState(false);

  const { theme } = useAppSelector(state => state.theme);

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  const handleSelectOption = (option: string) => {
    const params = new URLSearchParams(searchParams);

    if (option === 'All') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', option);
    }

    setSearchParams(params);
  };

  const toggleMenu = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }

    return setIsActive;
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="itemsDropdown" ref={dropdownRef}>
      <label className="itemsDropdown__label">{t('itemsDropdown.title')}</label>

      <label className="itemsDropdown__button" onClick={toggleMenu}>
        <p className="itemsDropdown__button-text">
          {searchParams.has('perPage')
            ? searchParams.get('perPage')
            : `${t('itemsDropdown.all')}`}
        </p>
        <img
          src={theme === 'light-theme' ? arrow : arrowDark}
          alt="Arrow"
          className={classNames('itemsDropdown__button-img', {
            'itemsDropdown__button-img-active': isActive,
          })}
        />
      </label>

      <ul
        className={classNames('itemsDropdown__list', {
          'itemsDropdown__list-isActive': isActive,
        })}
      >
        {options.map(option => (
          <li
            className="itemsDropdown__item"
            key={option}
            onClick={() => {
              handleSelectOption(option);
              setIsActive(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
