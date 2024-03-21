import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { SelectOptionType } from '../../types/SelectOtionsType';
import { Param } from '../../types/Params';

import './Select.scss';

type Props = {
  options: SelectOptionType[];
  selectedValue: Param;
  idOfSelect: string;
  onSelect: (valueToSelect: Param) => void;
};

export const Select: React.FC<Props> = memo(
  ({ options, selectedValue, idOfSelect, onSelect }) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const sortedOptions = useMemo(
      () =>
        [...options].sort((a, b) => {
          const aValue = a.optionValue;
          const bValue = b.optionValue;

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }

          return String(aValue).localeCompare(String(bValue));
        }),
      [options],
    );

    const selectedOption = useMemo(
      () =>
        options.find(({ optionValue }) => optionValue === selectedValue) ||
        options[0],
      [options, selectedValue],
    );

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="Select" id={idOfSelect} ref={selectRef}>
        <button
          type="button"
          className={classNames('Select__select', {
            'Select__select--focused': isFocused,
          })}
          onClick={() => setIsFocused(prevValue => !prevValue)}
        >
          {selectedOption.label}

          <span className="Select__icon">
            <i
              className={classNames('fas', {
                'fa-chevron-up': isFocused,
                'fa-chevron-down': !isFocused,
              })}
            />
          </span>
        </button>
        <section
          className={classNames('Select__options', {
            'Select__options--hidden': !isFocused,
          })}
        >
          {sortedOptions.map(option => {
            const { label, optionValue } = option;

            return (
              <button
                type="button"
                key={optionValue}
                className={classNames('Select__option', {
                  'Select__option--selected': optionValue === selectedValue,
                })}
                value={optionValue}
                onClick={() => {
                  onSelect(optionValue);
                  setIsFocused(false);
                }}
              >
                {label}
              </button>
            );
          })}
        </section>
      </div>
    );
  },
);
