import { useCallback, useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';

interface Props<T> {
  options: T[];
  activeOption: T | '';
  setActiveOption: (option: T) => void;
}

export const Dropdown = <T extends string>({
  options,
  activeOption,
  setActiveOption,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = useCallback(
    (option: T) => {
      setActiveOption(option);
      setIsOpen(false);
    },
    [setActiveOption],
  );

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={classNames(styles.dropdown__button, {
          [styles['dropdown__button--open']]: isOpen,
        })}
        onBlur={() => setIsOpen(false)}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {!activeOption ? 'Select Option' : activeOption}
      </button>

      {isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map(option => (
            <li
              className={styles.dropdown__item}
              key={option}
              onMouseDown={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
