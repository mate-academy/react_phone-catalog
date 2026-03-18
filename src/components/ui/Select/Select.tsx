import classNames from 'classnames';
import { useState } from 'react';
import { Filter, FilterValue } from '../../../types/types';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Select.module.scss';

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Choose one',
  title,
  hasDefaultValue,
}: Filter) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(item => item.value === value);

  const handleSelect = (eventValue: FilterValue) => {
    onChange(eventValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {title && <p className={styles.title}>{title}</p>}
        {/* {order && <button
          type="button"
          className={styles.order}
        >
          <img
            src={imageUrl('icons/ArrowUp.svg')}
            alt="order"
            className={classNames(styles.icon, {
              [styles.icon__desc]: order === 'desc'
            })}
          />
        </button>} */}
      </div>
      <div
        className={classNames(styles.select, {
          [styles.select__active]: isOpen,
        })}
      >
        <div
          className={styles.select__header}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? selected.label : placeholder}
          <img
            src={imageUrl('icons/ArrowDown.svg')}
            alt=""
            className={styles.select__icon}
          />
        </div>
        {isOpen && (
          <ul
            className={classNames(styles.list, {
              [styles.list__active]: isOpen,
            })}
          >
            {!hasDefaultValue && (
              <li
                className={styles.list__item}
                onClick={() => handleSelect(null)}
              >
                Reset
              </li>
            )}
            {options.map((item, index) => {
              return (
                <li
                  className={classNames(styles.list__item, {
                    [styles.list__item_active]: item.value === value,
                  })}
                  key={`${item.value}-${index}`}
                  onClick={() => handleSelect(item.value)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
