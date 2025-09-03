import '@/styles/main.scss';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './Dropdown.module.scss';
import '@/styles/main.scss';

interface DropdownProps {
  title: string;
  options: string[];
  selectedOption: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedOption,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.dropdown}>
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
            <div key={o} className={styles['dropdown__options--option']}>
              {o}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
