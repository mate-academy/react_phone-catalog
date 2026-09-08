import styles from './OptionSelector.module.scss';

import React from 'react';

type Props<T> = {
  label: string;
  options: T[];
  renderOption: (option: T) => React.ReactNode;
};

export const OptionSelector = <T extends React.Key>({
  label,
  options,
  renderOption,
}: Props<T>) => {
  return (
    <div className={styles.optionSelector}>
      <p className={styles.optionSelector__label}>{label}</p>
      <ul className={styles.optionSelector__list}>
        {options.map(option => (
          <li key={option} className={styles.actions__listItem}>
            {renderOption(option)}
          </li>
        ))}
      </ul>
    </div>
  );
};
