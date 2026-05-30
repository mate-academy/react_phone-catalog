import React from 'react';
import style from './SelectBox.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  title: string;
};

export const SelectBox: React.FC<Props> = ({
  value,
  onChange,
  options,
  title,
}) => {
  return (
    <div className={style.select}>
      <p className={style.select__title}>{title}</p>
      <select
        className={style.select__box}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
