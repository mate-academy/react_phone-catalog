import { useState, useRef, useEffect } from 'react';
import styles from './DropDownMenu.module.scss';

type Props = {
  options: string[];
  selected: string;
  handleChange: (value: string) => void;
};

export const DropDownMenu: React.FC<Props> = ({
  options,
  selected,
  handleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      <button
        type="button"
        className={`${styles.dropdown__button} ${isOpen ? styles['dropdown__button--active'] : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected}
      </button>
      {isOpen && (
        <ul className={`${styles.dropdown__content} ${styles.content}`}>
          {options.map(option => (
            <li
              key={option}
              className={styles.content__item}
              onClick={() => {
                handleChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
