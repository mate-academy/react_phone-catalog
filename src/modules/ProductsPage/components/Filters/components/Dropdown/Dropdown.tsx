import React, { useId, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { Option } from '../../../../../../types';
import { ArrowDownIcon } from '../../../../../../components';

import styles from './Dropdown.module.scss';

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonId = useId();

  const selectedOption = options.find(o => o.value === value) || options[0];

  const handleButtonClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={classNames(styles.dropdown, className)}>
      <label className={styles.dropdown__label} htmlFor={buttonId}>
        {label}
      </label>
      <button
        onClick={handleButtonClick}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        ref={buttonRef}
        id={buttonId}
        className={classNames(styles.dropdown__btn, {
          [styles['dropdown__btn--active']]: isOpen,
        })}
      >
        {selectedOption.label}
        <ArrowDownIcon
          className={classNames(styles.dropdown__icon, {
            [styles['dropdown__icon--active']]: isOpen,
          })}
        />
      </button>

      <ul
        role="listbox"
        className={classNames(styles.dropdown__list, {
          [styles['dropdown__list--active']]: isOpen,
        })}
      >
        {options.map(option => (
          <li
            key={option.value}
            onClick={() => handleOptionClick(option)}
            className={styles.dropdown__item}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
