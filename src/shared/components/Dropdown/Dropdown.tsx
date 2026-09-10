import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useState } from 'react';
import { DropdownOption } from '@/types/DropdownOptions';

interface Props {
  className?: string;
  description: string;
  options: DropdownOption[];
  value: DropdownOption['value'];
  onChange: (value: DropdownOption['value']) => void;
}

export const Dropdown = ({
  className,
  description,
  options,
  value,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const activeText = options.find(option => option.value === value)?.label;

  return (
    <div className={classNames(styles.dropdown, className)}>
      <p className={styles.descr}>{description}</p>

      <button
        type="button"
        className={classNames(styles.button, { [styles.active]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.buttonText}>{activeText}</span>
        <span
          className={classNames(styles.buttonIcon, { [styles.active]: isOpen })}
        />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {options.map(option => (
            <li
              key={option.label}
              className={classNames(styles.listItem, {
                [styles.selected]: value === option.value,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
