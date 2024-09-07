import { FC, useEffect, useState } from 'react';

import styles from './dropdown.module.scss';

import { TOptions } from 'utils/constants/optionsForSort';

type TProps = {
  text: string;
  options: TOptions[];
  setItemPerPage?: (value: number) => void;
};

export const Dropdown: FC<TProps> = ({
  text,
  options,
  setItemPerPage = () => {},
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(() => {
    const initialValue = options[0]?.value;

    return typeof initialValue === 'number' ? initialValue : 10;
  });

  useEffect(() => {
    setItemPerPage(selectedValue);
  }, [selectedValue, setItemPerPage]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedValue(Number(value));
  };

  return (
    <div className={styles.dropdown}>
      <label htmlFor={text}>{text}</label>
      <select
        id={text}
        className={styles.select}
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
