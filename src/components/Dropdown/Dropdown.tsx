import React, { useState } from 'react';
import styles from './Dropdown.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { DropdownData } from '../../types/Types';

type Props = {
  children: React.ReactNode;
  data: DropdownData;
  current: string;
};

export const Dropdown: React.FC<Props> = ({ children, data, current }) => {
  const { options, key } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const hadleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    const search = new URLSearchParams(searchParams);

    if (option === options[0]) {
      search.delete(key);
    } else {
      search.set(key, option);
    }

    setSearchParams(search);
  };

  return (
    <div className={styles.dropdown}>
      <span className={styles.label}>{children}</span>

      <div className={styles.wrapper}>
        <button
          onBlur={() => {
            setIsOpen(false);
          }}
          onClick={() => setIsOpen(prev => !prev)}
          className={cn(styles.button, isOpen && styles.open)}
        >
          {current || selectedOption}
        </button>
        {isOpen && (
          <ul className={styles.list}>
            {options.map(option => (
              <li key={option} className={styles.li}>
                <button
                  onMouseDown={() => {
                    hadleSelectOption(option);
                  }}
                  className={styles.option}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
