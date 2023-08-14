import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  options: string[];
  label: string;
  value: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  valueKey: string;
  handleOnClick: (
    option: string,
    setOption: React.Dispatch<React.SetStateAction<string>>,
    valueKey: string
  ) => void;
};

export const Selector: React.FC<Props> = ({
  options,
  label,
  value,
  setOption,
  valueKey,
  handleOnClick,
}) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false);

  const handleOnFocus = () => {
    setAreOptionsOpen(!areOptionsOpen);
  };

  return (
    <div className="products-list__sort">
      <div className="products-list__sort-by">
        {label}
      </div>

      <button
        className={cn(
          'products-list__selector',
          { 'products-list__selector--active': areOptionsOpen },
        )}
        type="button"
        onClick={handleOnFocus}
      >
        {value}

        <img
          src={areOptionsOpen ? (
            '../src/img/icons/chevron-arrow-up.svg'
          ) : (
            '../src/img/icons/chevron-arrow-down.svg'
          )}
          alt="open options"
          className="products-list__icon"
        />
      </button>

      {areOptionsOpen && (
        <div className="products-list__options-container">
          {options.map(option => (
            <button
              className="products-list__option"
              type="button"
              key={option}
              onClick={() => {
                handleOnClick(option, setOption, valueKey);
                setAreOptionsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
