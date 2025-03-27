import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdowns.module.scss';
import '../../styles/App.scss';

interface DropdownsProps {
  title: string;
  options: string[];
  onGetOption: (option: string) => void;
  currentOption: string;
}

const Dropdowns: React.FC<DropdownsProps> = ({
  title,
  options,
  onGetOption,
  currentOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onGetOption(option);

    setIsOpen(false);
  };

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <p className={styles.dropdown__title}>{title}</p>
      <button onClick={toggleDropdown} className={styles.dropdown__button}>
        <span className={styles['dropdown__button-text']}>{currentOption}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles[`dropdown__button-icon`]} ${isOpen ? styles[`dropdown__button-icon--rotated`] : ''}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M12.4712 5.52864C12.7316 5.78899 12.7316 6.2111 12.4712 6.47145L8.47124 10.4714C8.21089 10.7318 7.78878 10.7318 7.52843 10.4714L3.52843 6.47144C3.26808 6.2111 3.26808 5.78899 3.52843 5.52864C3.78878 5.26829 4.21089 5.26829 4.47124 5.52864L7.99984 9.05723L11.5284 5.52864C11.7888 5.26829 12.2109 5.26829 12.4712 5.52864Z"
            fill="#B4BDC4"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map(option => {
            return (
              <li
                key={option}
                className={styles.dropdown__item}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdowns;
