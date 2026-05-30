import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import IconArrow from '../../modules/shared/icons/iconArrow.svg?react';

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  setValues: (value: string) => void;
  value: string;
  setCurrentPage?: (value: number) => void;
};

export const Dropdown: React.FC<Props> = ({
  options,
  setValues,
  value,
  setCurrentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        buttonRef.current.blur();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={buttonRef}>
      <button
        type="button"
        className={`${styles.dropdown__trigger}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderColor: `${isOpen ? '#313237' : ''}` }}
      >
        <p className={styles.dropdown__value}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </p>
        <IconArrow
          style={{
            transform: `rotate(${isOpen ? '270' : '90'}deg)`,
            transition: 'transform 0.3s',
          }}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`${styles.dropdown__item} ${
                opt.value === value ? styles['dropdown__item--selected'] : ''
              }`}
              onClick={() => {
                setValues(opt.value);
                if (setCurrentPage) {
                  setCurrentPage(1);
                }

                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
