import { FC } from 'react';

import styles from './Search.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Search: FC<Props> = ({
  className,
  placeholder = 'Search something...',
  onChange,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    onChange(newValue);
  };

  return (
    <input
      type="search"
      value={value}
      onChange={handleChange}
      className={classNames(styles.search, className)}
      placeholder={placeholder}
    />
  );
};
