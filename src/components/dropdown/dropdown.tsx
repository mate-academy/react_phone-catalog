import { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.scss';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';
import classNames from 'classnames';

type Props = {
  options: string[];
  sortBy?: true;
};

export const Dropdown: React.FC<Props> = ({ options, sortBy }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, onSelect] = useState(options[0]);

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

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.dropdown, {
        [styles['dropdown--position']]: sortBy,
      })}
      ref={dropdownRef}
    >
      <p className={styles.dropdownLabel}>
        {sortBy ? 'Sort by' : 'Items on page'}
      </p>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        {isOpen ? (
          <Icon icon={icons.arrowUpDisabled} />
        ) : (
          <Icon icon={icons.arrowDown} />
        )}
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map(option => (
            <li
              key={option}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
