import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './Dropdown.module.scss';
import arrowDown from '../../images/icons/arrow_down.png';
import arrowUp from '../../images/icons/arrow_up.svg';

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
          className={styles.dropdown__button}
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
          <ul className={styles.dropdown__list}>
            {options.map(option => (
              <li
                key={option}
                onClick={() => selectOption(option)}
                className={cn(styles.dropdown__item, {
                  [styles['dropdown__item--active']]: option === activeOption,
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
