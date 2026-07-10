import React from 'react';
import './Filter.scss';
import { Icon } from '../../../shared/components/Icon';
import { useLanguage } from '../../../../context/LanguageContext';

type Props = {
  options: Option[];
  className?: string;
  title: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export type ItemsPage = '4' | '8' | '16' | 'all';
export type SortBy = 'newest' | 'alphabetically' | 'cheapest';

export type Option = {
  value: ItemsPage | SortBy;
  id: number;
};

export const Filter: React.FC<Props> = ({
  options,
  className,
  title,
  id,
  value,
  onChange,
}) => {
  const { texts } = useLanguage();

  return (
    <div className={`filter ${className}`}>
      <label htmlFor={id} className="filter__text">
        {title}
      </label>
      <div className="filter__wrapper-select">
        <select
          name={id}
          className="filter__select"
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(option => (
            <option key={option.id} value={option.value}>
              {texts[option.value]}
            </option>
          ))}
        </select>
        <Icon name="arrow-down" className="filter__icon" />
      </div>
    </div>
  );
};
