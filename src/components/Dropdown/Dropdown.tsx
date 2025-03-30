import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './Dropdown.module.scss';
import arrowDown from '../../images/icons/arrow_down.png';
import arrowUp from '../../images/icons/arrow_up.svg';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

type Props = {
  name: string;
  paramName: string;
  options: string[];
  defaultValue: string;
};

export const Dropdown: React.FC<Props> = ({
  name,
  paramName,
  options,
  defaultValue,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName) || defaultValue;
  const [selectedOption, setSelectedOption] = useState(paramValue);
  const { theme } = useContext(ThemeContext);

  const activeOption =
    options.find(option => option === selectedOption) || options[0];

  const dropdownRef = useRef<HTMLButtonElement>(null);

  const selectOption = (option: string) => {
    setOpenDropdown(false);
    setSelectedOption(option);

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(paramName, option);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__container}>
        <p className={styles.dropdown__name}>{name}</p>
        <button
          ref={dropdownRef}
          className={cn(styles.dropdown__button, {
            [styles['dropdown__button--dark']]: theme === Theme.Dark,
          })}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {selectedOption}
          <img
            className={styles.dropdown__img}
            src={openDropdown ? arrowUp : arrowDown}
            alt="Arrow Down"
          />
        </button>

        {openDropdown && (
          <ul
            className={cn(styles.dropdown__list, {
              [styles['dropdown__list--dark']]: theme === Theme.Dark,
            })}
          >
            {options.map(option => (
              <li
                key={option}
                onClick={() => selectOption(option)}
                className={cn({
                  [styles.dropdown__item]: theme === Theme.Light,
                  [styles['dropdown__item--active']]:
                    option === activeOption && theme === Theme.Light,
                  [styles['dropdown__item-dark']]: theme === Theme.Dark,
                  [styles['dropdown__item-dark--active']]:
                    option === activeOption && theme === Theme.Dark,
                })}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
