import React from 'react';
import style from './Select.module.scss';
import { ArrowDownIcon } from '../Icons/ArrowDownIcon';
import classNames from 'classnames';

type Options = {
  value: string;
  label: string;
};

interface Props {
  options: Options[];
  value: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<Props> = ({ onChange, options, value }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      className={style.custom__select}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={style.custom__select_trigger}>
        {options.find(option => option.value === value)?.label}
        <ArrowDownIcon
          className={classNames(style.custom__select_icon, {
            [style.custom__select_icon__open]: isOpen,
          })}
        />
      </div>
      {isOpen && (
        <div className={style.custom__select_option}>
          {options.map(option => (
            <div
              key={option.value}
              className={style.custom__select_option_item}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
