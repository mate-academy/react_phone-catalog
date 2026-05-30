import './DropdownMenu.scss';
import { useEffect, useRef, useState } from 'react';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const DropdownMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    t('dropdownMenu.item.newest'),
    t('dropdownMenu.item.alphabetically'),
    t('dropdownMenu.item.cheapset'),
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  const handleSelectOpiton = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);

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

  const transSort = (sort: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sort === 'Найновіші' && i18next.language === 'en') {
      params.set('sort', 'Newest');
      setSearchParams(params);
    } else if (sort === 'Newest' && i18next.language === 'uk') {
      params.set('sort', 'Найновіші');
      setSearchParams(params);
    }

    if (sort === 'Алфавітом' && i18next.language === 'en') {
      params.set('sort', 'Alphabetically');
      setSearchParams(params);
    } else if (sort === 'Alphabetically' && i18next.language === 'uk') {
      params.set('sort', 'Алфавітом');
      setSearchParams(params);
    }

    if (sort === 'Найдешевші' && i18next.language === 'en') {
      params.set('sort', 'Cheapset');
      setSearchParams(params);
    } else if (sort === 'Cheapset' && i18next.language === 'uk') {
      params.set('sort', 'Найдешевші');
      setSearchParams(params);
    }

    return sort;
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
    <div className="dropdownMenu" ref={dropdownRef}>
      <label className="dropdownMenu__label">{t('dropdownMenu.title')}</label>

      <label className="dropdownMenu__button" onClick={toggleMenu}>
        <p className="dropdownMenu__button-text">
          {searchParams.has('sort')
            ? transSort(searchParams.get('sort'))
            : `${t('dropdownMenu.select')}`}
        </p>
        <img
          src={theme === 'light-theme' ? arrow : arrowDark}
          alt="Arrow"
          className={classNames('dropdownMenu__button-img', {
            'dropdownMenu__button-img-active': isActive,
          })}
        />
      </label>

      <ul
        className={classNames('dropdownMenu__list', {
          'dropdownMenu__list-active': isActive,
        })}
      >
        {options.map(option => (
          <li
            className="dropdownMenu__item"
            key={option}
            onClick={() => {
              setIsActive(false);

              handleSelectOpiton(option);
            }}
          >
            {option}
          </li>
        ))}

        {/* <li
          className="dropdownMenu__item"
          onClick={() => {
            setIsActive(false);

            handleSelectOpiton(t('dropdownMenu.item.newest'));
          }}
        >
          {t('dropdownMenu.item.newest')}
        </li>
        <li
          className="dropdownMenu__item"
          onClick={() => {
            setIsActive(false);
            handleSelectOpiton(t('dropdownMenu.item.alphabetically'));
          }}
        >
          {t('dropdownMenu.item.alphabetically')}
        </li>
        <li
          className="dropdownMenu__item"
          onClick={() => {
            setIsActive(false);
            handleSelectOpiton(t('dropdownMenu.item.cheapset'));
          }}
        >
          {t('dropdownMenu.item.cheapset')}
        </li> */}
      </ul>
    </div>
  );
};
