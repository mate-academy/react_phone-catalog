import { useSearchParams } from 'react-router-dom';
import styles from './ItemsPerPageSelect.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
const options = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const ItemsPerPageSelect: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const itemsPerPage = searchParams.get('perPage') || '16';
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleItemsPerPageChange = option => {
    setSelectedOption(option);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('perPage', option.value);
    newParams.set('page', '1'); // Reset to page 1
    setSearchParams(newParams);
    setIsOpen(false);
  };

  return (
    <div className={styles.ItemsPerPageSelect} ref={dropdownRef}>
      <div className={styles.ItemsPerPageSelect__label}>
        {t('perPageSelect.perPage')}
      </div>
      <div
        className={styles.ItemsPerPageSelect__selected}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
        <img
          src="./img/buttons/arrow-down.svg"
          alt="Arrow Down"
          className={`${styles.ItemsPerPageSelect__arrow} ${isOpen ? styles.ItemsPerPageSelect__arrow_open : ''}`}
        />
      </div>
      {
        <ul
          className={`${styles.ItemsPerPageSelect__options} ${isOpen ? styles.ItemsPerPageSelect__options_open : ''}`}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={styles.ItemsPerPageSelect__option}
              onClick={() => {
                handleItemsPerPageChange(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
