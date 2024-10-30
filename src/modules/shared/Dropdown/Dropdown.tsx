import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../../utils/searchHelper';

import styles from './Dropdown.module.scss';
import { Arrow } from '../Icons/Arrow/Arrow';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  name: string;
  values: string[];
  defaultValue: string;
};

export const Dropdown: React.FC<Props> = ({ name, values, defaultValue }) => {
  const { isThemeDark } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const valueFromSearchParams = searchParams.get(name) || '';

  if (!values.includes(valueFromSearchParams) && valueFromSearchParams) {
    setSearchParams(
      getSearchWith(searchParams, {
        [name]: null,
        page: null,
      }),
    );
  }

  const selectedValue = values.includes(valueFromSearchParams)
    ? valueFromSearchParams
    : defaultValue;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (value: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        [name]: value === defaultValue ? null : value,
        page: null,
      }),
    );
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.Dropdown, {
        [styles.Dropdown_darkTheme]: isThemeDark,
      })}
    >
      <div
        className={classNames(styles.Dropdown__header, {
          [styles.Dropdown__header_active]: isOpen,
          [styles.Dropdown__header_darkTheme]: isThemeDark,
          [styles.Dropdown__header_active_darkTheme]: isOpen && isThemeDark,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}

        <span className={styles.Dropdown__arrow}>
          {isOpen ? (
            <Arrow orientation="top" />
          ) : (
            <Arrow orientation="bottom" />
          )}
        </span>
      </div>
      <div
        className={classNames(styles.Dropdown__content, {
          [styles.Dropdown__content_active]: isOpen,
          [styles.Dropdown__content_darkTheme]: isThemeDark,
        })}
      >
        <ul className={styles.Dropdown__list}>
          {values.map(value => (
            <li
              key={value}
              className={classNames(styles.Dropdown__item, {
                [styles.Dropdown__item_darkTheme]: isThemeDark,
              })}
              onClick={() => handleSelectOption(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
