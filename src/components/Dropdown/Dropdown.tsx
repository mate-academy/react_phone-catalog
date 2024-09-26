/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  label: string;
  options: string[];
  activeOption: string;
  onChange(item: string): void;
};

export const Dropdown = ({ label, options, activeOption, onChange }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(activeOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onChange(item);
    setIsOpen(false);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };
  
  console.log(selectedItem);
  
  return (
    <div className={styles.dropdown} ref={dropdownRef} tabIndex={0} onBlur={handleOnBlur}>
      <div className={styles.dropdownLabel}>{label}</div>
      <div
        className={classNames(styles.dropdownMain, { [styles.dropdownActive]: isOpen })}
        onClick={handleToggle}
      >
        <div>{t(selectedItem) ? t(selectedItem) : 'Default'}</div>
        <div className={classNames(styles.dropdownIcon, { [styles.activeIcon]: isOpen })}></div>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((item) => (
            <li
              key={item}
              className={classNames(styles.dropdownItem, {
                [styles.activeItem]: item === selectedItem,
              })}
              onClick={() => handleSelect(item)}
            >
              {t(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
