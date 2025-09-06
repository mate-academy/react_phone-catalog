import '@/styles/main.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import '@/styles/main.scss';

interface DropdownProps {
  title: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectOption = (option: string) => {
    setOpen(false);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <label
        htmlFor="dropdown"
        className={classNames(styles.dropdown__label, 'text__small')}
      >
        {title}
      </label>
      <div
        id="dropdown"
        className={styles.dropdown__select}
        onClick={() => setOpen(!isOpen)}
      >
        <div
          className={classNames(styles.dropdown__placeholder, {
            [styles['dropdown__placeholder--open']]: isOpen,
          })}
        >
          <span className={styles['dropdown__placeholder--text']}>
            {selectedOption}
          </span>
          <div
            className={classNames(styles['dropdown__placeholder--arrow'], {
              [styles['dropdown__placeholder--arrow-open']]: isOpen,
            })}
          >
            <i className="icon icon--up"></i>
          </div>
        </div>
        <div
          className={classNames(styles.dropdown__options, {
            [styles['dropdown__options-open']]: isOpen,
          })}
        >
          {options.map((o: string) => (
            <div
              key={o}
              className={styles['dropdown__options--option']}
              onClick={() => selectOption(o)}
            >
              {o}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
