import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

interface Props {
  items: string[];
  onSelectedItem: (item: string) => void;
  defaultValue: string;
}

export const Dropdown: React.FC<Props> = ({ items, onSelectedItem, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultValue);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.container}>
      <button
        type="button"
        className={classNames(styles.header, 'buttons')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.select}>{selected}</span>
        <span className={classNames(styles.arrow, { [styles.arrowOpen]: isOpen })}>
          <Icon variant="arrow-down" />
        </span>
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {items.map(item => (
            <li key={item} className={styles.item}>
              <button
                type="button"
                className={classNames(styles.itemButton, 'body-text ')}
                onClick={() => {
                  onSelectedItem(item);
                  setSelected(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
