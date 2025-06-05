/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import classNames from 'classnames';

import { Icon } from '../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../shared/components/ui/Icon/IconNames';

import styles from './Dropdown.module.scss';

type DropdownProps = {
  label: string;
  selectedOption: string;
  options: string[];
  onSelect: (value: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedOption,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    return () => {
      onSelect(value);
      setIsOpen(false);
    };
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div
      className={styles.select}
      tabIndex={0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <p className={styles.label}>{label}</p>
      <button
        className={classNames(styles.dropDownButton, { [styles.open]: isOpen })}
        type="button"
        onClick={toggleDropdown}
      >
        {selectedOption}

        {!isOpen ? (
          <Icon
            className={classNames(styles.arrowIcon, {
              [styles.arrowDown]: !isOpen,
            })}
            name={IconNames.Arrow}
          />
        ) : (
          <Icon
            className={classNames(styles.arrowIcon, {
              [styles.arrowUp]: isOpen,
            })}
            name={IconNames.Arrow}
          />
        )}
      </button>

      {isOpen && (
        <ul
          className={classNames(styles.dropdownContent, {
            [styles.animate]: isOpen,
          })}
        >
          {options.map(option => (
            <li
              key={option}
              className={styles.option}
              tabIndex={0}
              onClick={handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
