import { useEffect, useState } from 'react';
import styles from './CustomSelect.module.scss';
import arrowDown from '../../../public/img/icons/arrows/arrow-down-icon.svg';
import arrowUp from '../../../public/img/icons/arrows/arrow-up-icon.svg';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  label: string;
  updateProducts?: (itemsPerPage: number | 'all') => void;
};

const CustomSelect: React.FC<Props> = ({ options, label, updateProducts }) => {
  const defaultOption = options.length === 4 ? options[3] : options[0];

  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const selectedOption = selected.value;

    if (updateProducts) {
      updateProducts(
        selectedOption === 'all' ? selectedOption : +selectedOption,
      );
    }
  }, [selected]);

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
              className={styles.select__option}
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
