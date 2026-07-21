import { FC, useId, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

type Props = {
  label: string;
  value: string;
  options: DropdownOption<string>[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

const ARROW_DOWN_PATH =
  'M12.4712 5.52864C12.7316 5.78899 12.7316 6.2111 ' +
  '12.4712 6.47145L8.47124 10.4714C8.21089 10.7318 ' +
  '7.78878 10.7318 7.52843 10.4714L3.52843 6.47144C3.26808 ' +
  '6.2111 3.26808 5.78899 3.52843 5.52864C3.78878 ' +
  '5.26829 4.21089 5.26829 4.47124 5.52864L7.99984 ' +
  '9.05723L11.5284 5.52864C11.7888 5.26829 12.2109 ' +
  '5.26829 12.4712 5.52864Z';

export const Dropdown: FC<Props> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  const activeOption = options.find(opt => opt.value === value) || options[0];
  const isDropdownOpen = isOpen && !disabled;

  return (
    <div
      className={classNames(styles.dropdown, {
        [styles.dropdownOpen]: isDropdownOpen,
        [styles.dropdownDisabled]: disabled,
      })}
    >
      <p className={styles.dropdown__label}>{label}</p>

      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen(current => !current)}
        type="button"
        disabled={disabled}
        aria-expanded={isDropdownOpen}
        aria-controls={listId}
      >
        <span className={styles.dropdown__value}>{activeOption.label}</span>
        <span className={styles.dropdown__icon} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={ARROW_DOWN_PATH}
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <ul id={listId} className={styles.dropdown__list}>
        {options.map(option => {
          return (
            <li key={option.label} className={styles.dropdown__item}>
              <button
                className={styles.dropdown__option}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
