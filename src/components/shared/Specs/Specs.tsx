import './Specs.scss';
import React from 'react';

type Props = {
  specs: Record<string, string | string[] | undefined>;
};

export const Specs: React.FC<Props> = ({ specs }) => {
  return (
    <ul className="specs">
      {Object.entries(specs).map(([key, value]) => {
        if (value === undefined) {
          return null;
        }

        const displayedValue = Array.isArray(value) ? value.join(', ') : value;

        return (
          <li key={key} className="specs__item">
            <span className="specs__label">{key}</span>
            <span className="specs__value">{displayedValue}</span>
          </li>
        );
      })}
    </ul>
  );
};
