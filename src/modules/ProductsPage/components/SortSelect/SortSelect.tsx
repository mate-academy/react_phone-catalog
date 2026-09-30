import { useEffect, useRef, useState } from 'react';
import styles from './SortSelect.module.scss';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SortSelect: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.sortContainer} ref={containerRef}>
      <span className={styles.label}>Sort by</span>

      <button
        type="button"
        className={classNames(styles.trigger, {
          [styles['trigger--open']]: isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
        data-cy="sortSelect"
      >
        <span>{selectedOption.label}</span>
        <span
          className={classNames(styles.arrow, {
            [styles['arrow--open']]: isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.option, {
                [styles['option--selected']]: option.value === value,
              })}
            >
              <button
                type="button"
                className={styles.optionButton}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
