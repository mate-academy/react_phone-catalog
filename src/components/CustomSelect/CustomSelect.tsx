import { useState } from 'react';
import styles from './CustomSelect.module.scss';
import arrowDown from '/img/icons/arrows/arrow-down-icon.svg';
import arrowUp from '/img/icons/arrows/arrow-up-icon.svg';
import { useSearchParams } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  label: string;
  paramName: string;
};

const CustomSelect: React.FC<Props> = ({ options, label, paramName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue =
    searchParams.get(paramName) ||
    (paramName === 'perPage' ? 'all' : paramName === 'sort' ? 'newest' : '');

  const defaultOption =
    options.find(option => option.value === paramValue) || options[0];
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option);
    setIsOpen(false);

    const selectedOption = option.value;
    const params = new URLSearchParams(searchParams);

    if (selectedOption !== 'all') {
      params.set(paramName, selectedOption.toString());
    } else {
      params.delete(paramName);
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className={styles.select}>
      <div className={styles.select__label}>{label}</div>
      <div className={styles.select__box} onClick={toggleDropdown}>
        <div className={styles.select__selected}>{selected.label}</div>
        <img
          className={`${styles.select__arrow} ${isOpen ? styles.open : ''}`}
          src={isOpen ? arrowUp : arrowDown}
          alt="arrow"
        />
      </div>

      {isOpen && (
        <div className={styles.select__dropdown}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${styles.select__option} ${
                selected.value === option.value
                  ? styles.select__option_selected
                  : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
