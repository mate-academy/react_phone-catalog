import { useState } from 'react';

import ArrowIcon from '@/assets/icons/arrow-up.svg?react';
import { cn } from '@/shared/utils';

import styles from './Dropdown.module.scss';

interface Props<T> {
  className?: string;
  selectClassName?: string;
  description?: string;
  value: T;
  values: readonly T[];
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
  getKey: (value: T) => string | number;
}

export const Dropdown = <T,>({
  value,
  description,
  values,
  className = '',
  selectClassName = '',
  onChange,
  getLabel,
  getKey,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(styles.dropdown, className)}>
      {description && <h6 className={styles.description}>{description}</h6>}
      <div
        className={cn(
          styles.select,
          { [styles.selectFocus]: isOpen },
          selectClassName,
        )}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={styles.value}>{getLabel(value)}</span>
        <ArrowIcon
          aria-hidden="true"
          className={cn(styles.arrow, { [styles.arrowDown]: isOpen })}
        />
      </div>

      <div className={cn(styles.list, { [styles.listIsOpen]: isOpen })}>
        {isOpen &&
          values.map(item => (
            <div
              key={getKey(item)}
              className={styles.item}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
            >
              <span>{getLabel(item)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
