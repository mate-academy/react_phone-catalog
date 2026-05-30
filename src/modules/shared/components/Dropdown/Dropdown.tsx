import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon/Icon';

type Props = {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdown__title}>{title}</div>
      <button
        className={classNames(styles.dropdown__button, {
          [styles.active]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className={styles.dropdown__arrow}>
          <Icon icon={icons.arrow_top} />
        </span>
      </button>

      <ul
        className={classNames(styles.dropdown__list, {
          [styles.open]: isOpen,
        })}
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.dropdown__item}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
