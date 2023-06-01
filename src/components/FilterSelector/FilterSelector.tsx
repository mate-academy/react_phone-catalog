import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import './FilterSelector.scss';
import classNames from 'classnames';
import { Filter, Page } from '../../types/filters';

type FilterProps = {
  name: string;
  label: string;
  width: number;
  options: Filter[] | Page[];
};

export const FilterSelector = ({
  name,
  label,
  width,
  options,
}: FilterProps) => {
  const selector = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(
    typeof options[0] === 'string' ? options[0] : options[0].label,
  );

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

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    selector?.current?.blur();
    setSelected(e.target.name);
  };

  return (
    <div className="selector">
      <label className="selector__label">{[label, name]}</label>
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
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <label key={option} className="selector__option">
                  <input
                    onChange={(e) => handleClick(e)}
                    value={option}
                    name={option}
                    type="radio"
                    className="selector__input"
                  />
                  {option}
                </label>
              );
            }

            return (
              <label key={option.value} className="selector__option">
                <input
                  onChange={(e) => handleClick(e)}
                  value={option.value}
                  name={option.label}
                  type="radio"
                  className="selector__input"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
