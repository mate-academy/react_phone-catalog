import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';

import './FilterSelector.scss';
import { Filter } from '../../types/filters';

type FilterProps = {
  name: string;
  label: string;
  width: number;
  options: Filter;
  startValue: string;
  onChange: (value: string) => void;
};

export const FilterSelector = ({
  name,
  label,
  width,
  options,
  startValue,
  onChange,
}: FilterProps) => {
  const selector = useRef<HTMLButtonElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string>(startValue);

  const [filterParams, setFilterParams] = useSearchParams();

  useEffect(() => {
    const selectedSearchParam = filterParams.get(name);

    if (selectedSearchParam) {
      setSelected(options[selectedSearchParam]);

      return;
    }

    filterParams.append(name, selected);
    setFilterParams(filterParams);
  }, [filterParams]);

  const handleClickOutside = () => {
    if (!dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.body.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    selector?.current?.blur();
    onChange(value);
    filterParams.set(name, value);
    setFilterParams(filterParams);
  }, []);

  return (
    <div className="selector">
      <label className="selector__label">{label}</label>
      <div style={{ width }} className="selector__wrapper">
        <button
          onClick={() => setDropdownOpen(true)}
          ref={selector}
          type="button"
          className="selector__field"
        >
          <span className="selector__active">{selected}</span>
        </button>

        <div
          className={classNames('selector__dropdown', {
            'selector__dropdown--active': dropdownOpen,
          })}
        >
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="selector__option">
              <input
                onChange={handleChange}
                value={key}
                name={name}
                type="radio"
                className="selector__input"
              />
              {value}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
