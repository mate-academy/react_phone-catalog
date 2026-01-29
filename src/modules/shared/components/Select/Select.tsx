import React from 'react';
import { OptionType } from '../../../ItemsPage/components/ItemsPage/ItemsPage';
import cn from 'classnames';

interface Props {
  param: string;
  options: OptionType[];
  onChange: (param1: string, param2: string) => void;
  value: string;
  className?: string;
}
export const Select: React.FC<Props> = ({
  param,
  options,
  onChange,
  value,
  className,
}) => {
  return (
    <select
      name={param}
      onChange={event => onChange(param, event.target.value)}
      className={cn('select', className)}
      value={value}
    >
      {options.map(option => {
        return (
          <option
            key={option.text}
            value={option.value}
            className="select__option"
          >
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
