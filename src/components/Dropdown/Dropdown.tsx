import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

type Item = {
  name: string;
  title: string;
};

type Props = {
  items: Item[];
  params: string;
};

export const Dropdown: React.FC<Props> = ({ items, params }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Item | null>(
    items.length > 0 ? items[0] : null,
  );

  const [searchParams] = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleOptionClick = (option: Item): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdown__header} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.title : 'Select an option'}
        <img
          className={`${styles.dropdown__icon} ${isOpen ? styles.dropdown__icon_rotate : null}`}
          src="img/icons/vector.svg"
          alt=""
        />
      </div>
      {isOpen && (
        <div className={styles.dropdown__body}>
          {items.map((option, index) => (
            <Link
              key={index}
              to={{
                search: getSearchWith(searchParams, {
                  [params]: option.name,
                  page: '1',
                }),
              }}
              className={styles.dropdown__item}
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
