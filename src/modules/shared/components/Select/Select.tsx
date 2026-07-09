import React from 'react';
import classNames from 'classnames';
import { ArrowUpIcon } from '../Icons';
import styles from './Select.module.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  containerClass?: string;
  id: string;
}

export const Select: React.FC<Props> = ({
  label,
  options,
  containerClass,
  id,
  ...rest
}) => {
  return (
    <div className={classNames(styles.container, containerClass)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div className={styles.wrapper}>
        <select id={id} className={styles.select} {...rest}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={classNames(styles.icon, 'icon icon--down')}>
          <ArrowUpIcon />
        </div>
      </div>
    </div>
  );
};
