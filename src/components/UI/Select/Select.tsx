import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';

import styles from './Select.module.scss';

type Props = {
  title?: string;
  placeholder: string;
  options: string[];
  searchParamKey: string;
};

export const Select: React.FC<Props> = ({
  title = '',
  placeholder,
  options,
  searchParamKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(state => !state);

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchParams.has(searchParamKey) && searchParamKey !== null) {
      const searchParamValue = searchParams.get(searchParamKey);

      if (searchParamValue !== null) {
        setSelected(searchParamValue);
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, []);

  return (
    <div className={styles.select__wrapper}>
      <p className="main-text main-text--sm main-text--secondary">{title}</p>
      <div
        className={classNames(styles.select, {
          [styles['select--focus']]: isOpen,
        })}
      >
        <div
          className={styles.select__button}
          ref={buttonRef}
          onClick={toggleDropdown}
        >
          <p className={`button-text ${styles['select__selected-option']}`}>
            {selected}
          </p>
          <button
            className={classNames(`${styles['select__button--arrow']}`, {
              'button--arrow-bottom': !isOpen,
              'button--arrow-top': isOpen,
            })}
          ></button>
        </div>

        <div
          ref={dropdownRef}
          className={classNames(styles.select__dropdown, {
            [styles['select__dropdown--open']]: isOpen,
          })}
        >
          {options.map(option => (
            <SearchLink
              key={option}
              params={{ [searchParamKey]: `${option}` }}
              onClick={() => handleSelect(option)}
              className={classNames(
                `main-text ${styles['select__dropdown-option']}`,
                {
                  [styles['select__dropdown-option--selected']]:
                    selected === option,
                },
              )}
            >
              {option}
            </SearchLink>
          ))}
        </div>
      </div>
    </div>
  );
};
