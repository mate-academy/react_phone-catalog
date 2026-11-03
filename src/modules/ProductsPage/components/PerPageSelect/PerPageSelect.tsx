import { useEffect, useRef, useState } from 'react';
import styles from './PerPageSelect.module.scss';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

type Props = {
  value: string | number;
  onChange: (value: string) => void;
};

export const PerPageSelect: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stringValue = String(value);

  const selectedOption =
    options.find(opt => opt.value === stringValue) || options[0];

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
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.perPageContainer} ref={containerRef}>
      <span className={styles.label}>Items on page</span>

      <button
        type="button"
        className={classNames(styles.trigger, {
          [styles['trigger--open']]: isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
        data-cy="perPageSelect"
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
                [styles['option--selected']]: option.value === stringValue,
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
