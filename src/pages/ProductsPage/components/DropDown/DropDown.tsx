import { useState } from 'react';
import styles from './DropDown.module.scss';
import { Icon } from '../../../../components/Icon';
import classNames from 'classnames';

type Props = {
  options: { [key: string]: string };
  value: string;
  onOptionSelect: (option: string) => void;
};

export const DropDown = ({
  options,
  value,
  onOptionSelect,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdown__btn}>
        <div className={styles.dropdown__icon}>
          {isOpen ? <Icon type="arrowTop" /> : <Icon type="arrowDown" />}
        </div>
        {value}
      </button>
      <ul
        className={classNames(styles.dropdown__content, {
          [styles.open]: isOpen,
        })}
      >
        {Object.entries(options).map(([option, label]) => (
          <li
            key={option}
            onClick={() => {
              onOptionSelect(option);
              setIsOpen(false);
            }}
            className={classNames(styles.dropdown__option, {
              [styles.active]: option === value,
            })}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};