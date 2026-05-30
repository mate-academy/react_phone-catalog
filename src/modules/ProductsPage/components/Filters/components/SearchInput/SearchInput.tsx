import React, { useId } from 'react';
import classNames from 'classnames';

import styles from './SearchInput.module.scss';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  className = '',
  placeholder = 'Search...',
}) => {
  const inputId = useId();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classNames(styles['search-input'], className)}>
      <label htmlFor={inputId} className={styles['search-input__label']}>
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={styles['search-input__field']}
      />
    </div>
  );
};
