import { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';

type Props<T extends string> = {
  options: T[];
  label: string;
  selected: T;
  onSelect: (value: T) => void;
};

export const DropDown = <T extends string>({
  label,
  options,
  selected,
  onSelect,
}: Props<T>) => {
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const isSortBySelect = label === 'Sort by';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsActiveSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsActiveSelect(false);
  };

  return (
    <div className="drop__item" ref={selectRef}>
      <span className="drop__label">{label}</span>
      <div
        className={classNames(
          'drop__select',
          { 'drop__select--sort-by': isSortBySelect },
          { 'drop__select--active': isActiveSelect },
        )}
        onClick={() => setIsActiveSelect(!isActiveSelect)}
      >
        <div className="drop__input">{selected}</div>
        <div className="drop__icon" />
      </div>
      {isActiveSelect && (
        <ul
          className={classNames('drop__options', {
            'drop__options--sort-by': isSortBySelect,
          })}
        >
          {options.map(option => (
            <li
              key={option}
              className="drop__option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
