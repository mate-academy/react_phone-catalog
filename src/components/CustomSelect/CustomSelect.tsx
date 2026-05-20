import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './CustomSelect.module.scss';

type CustomSelectProps<T extends string | number> = {
  placeholder: string;
  options: T[];
  defaultValue: T;
  onChange: (value: T) => void;
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
};

export const CustomSelect = <T extends string | number>({
  placeholder,
  options,
  defaultValue,
  onChange,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<T>(defaultValue);
  const selectRef = useRef<HTMLUListElement>(null);

  let currentFilter: string = '';

  if (typeof defaultValue === 'string') {
    switch (defaultValue) {
      case 'age':
        currentFilter = 'Newest';
        break;
      case 'price':
        currentFilter = 'Cheapest';
        break;
      case 'title':
        currentFilter = 'Alphabetically';
        break;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.select}>
      <p className={styles.placeholder}>{placeholder}</p>
      <div
        className={`${styles.box} ${isOpen ? styles.focused : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <p className={styles.value}>
          {currentFilter.length > 0 ? `${currentFilter}` : `${value}`}
        </p>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            /* eslint-disable-next-line max-len */
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            fill="#B4BDC4"
          />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            variants={dropdownVariants}
            className={styles.options}
            ref={selectRef}
          >
            {options.map(option => (
              <li
                key={option}
                className={styles.item}
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                  onChange(option);
                }}
              >
                <p>{option}</p>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
