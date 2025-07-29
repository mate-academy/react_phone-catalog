/* eslint-disable react/display-name */
import { FC, memo, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

type Props = {
  label: 'Sort by' | 'Items on page';
  value: string;
  options: string[];
  paramsToUpdate: (value: string) => {
    [key: string]: string;
  };
};

export const Dropdown: FC<Props> = memo(
  ({ label, value, options, paramsToUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () =>
        document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
      <div ref={dropdownRef} className={styles.dropdown}>
        <span className={styles.label}>{label}</span>

        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className={styles.button}
        >
          <span className={styles.buttonText}>{value}</span>
          <span
            className={cn(styles.buttonIcon, {
              [styles.buttonIconOpen]: isOpen,
            })}
          ></span>
        </button>

        <ul className={cn(styles.list, { [styles.listOpen]: isOpen })}>
          {options.map(option => (
            <li key={option} className={styles.listItem}>
              <SearchLink
                onClick={() => setIsOpen(false)}
                paramsToUpdate={paramsToUpdate(option)}
                className={styles.listLink}
              >
                {option}
              </SearchLink>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
