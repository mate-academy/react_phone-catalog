import { useState } from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  options: string[][];
  defaultOption: string;
  title: string;
  selectHandle: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  options,
  title,
  selectHandle,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: string,
    label: string,
  ) => {
    if (label === selectedOption) {
      e.preventDefault();
      setIsOpen(false);

      return;
    }

    selectHandle(value);
    setSelectedOption(label);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <p className={styles.dropdown__name}>{title}</p>
      <div
        className={styles.dropdown__input}
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <p className={styles.dropdown__selectedOption}>
          {selectedOption || '...'}
        </p>
      </div>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map(([label, value]) => (
            <li
              key={label}
              className={styles.dropdown__option}
              onClick={e => handleSelect(e, value, label)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
