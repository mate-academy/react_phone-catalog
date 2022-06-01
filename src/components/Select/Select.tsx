import React from 'react';

type Props = {
  title: string;
  value: string;
  params: { [key: string | number]: string | number };
  searchParam: string;
  onChange: (x: string, y: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = (
  {
    title, value, params, searchParam, onChange,
  },
) => {
  return (
    <div className="products__control">
      <h4 className="products__control-title">
        {title}
      </h4>
      <select
        className="products__select"
        value={value}
        onChange={event => onChange(searchParam, event)}
      >
        {Object.entries(params).map(param => {
          return (
            <option
              key={param[0]}
              value={param[0]}
              className="products__select-option"
            >
              {param[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
