import { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';

type Props<T extends string> = {
  options: T[];
  active: T;
  setValueFunction: (value: T) => void;
};

export const Dropdown = <T extends string>({
  options,
  active,
  setValueFunction,
}: Props<T>) => {
  const [activeOption, setActiveOption] = useState(active);
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option: T) => {
    setValueFunction(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setActiveOption(active);
  }, [active]);

  return (
    <div className={styles.dropdown}>
      <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(styles.dropdownForm, {
          [styles.focusedForm]: isOpen,
        })}
      >
        <input
          type="text"
          value={`${activeOption}`}
          className={styles.dropdownInput}
        />
        <button
          className={classNames({
            downBtn: !isOpen,
            upBtn: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="icon arrow" />
        </button>
      </div>
      {isOpen && (
        <ul className={`${styles.options} ${styles.activeMenu}`}>
          {options.map(option => (
            <li
              key={option}
              className={`${styles.option} body-text-small grayText`}
              onMouseDown={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
