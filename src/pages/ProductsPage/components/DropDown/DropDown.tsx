import React, { useState } from 'react';
import styles from './DropDown.module.scss';
import { Icon } from '../../../../components/Icon';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  options: { [key: string]: string };
  value: string;
};

export const DropDown: React.FC<Props> = ({ options, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSearchParams({ ...searchParams, sortField: option });
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdown__btn}>
        <div className={styles.dropdown__icon}>
          {isOpen ? <Icon type="arrowTop" /> : <Icon type="arrowDown" />}
        </div>
        {value}
      </button>
      <ul
        className={classNames(styles.dropdown__content, {
          [styles.open]: isOpen,
        })}
      >
        {Object.entries(options).map(([option, label]) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            className={classNames(styles.dropdown__option, {
              [styles.active]: option === value,
            })}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
