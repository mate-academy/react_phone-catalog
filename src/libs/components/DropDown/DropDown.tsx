import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';

import './DropDown.scss';

type DropProps<T> = {
  label: string,
  value: T,
  setValue: (value: T) => void
  options: { value: T, label: string }[],
  width: number,
};

export const DropDown = <T extends string>({
  label,
  value,
  setValue,
  options,
  width,
}: DropProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as T);

    if (selectRef.current) {
      selectRef.current.blur();
      setIsOpen(false);
    }
  };

  const hadnleSelectClick = () => {
    if (selectRef.current && isOpen) {
      selectRef.current.blur();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isCLickOutside = !(selectRef.current
        && e.target
        && e.target instanceof HTMLElement
        && (selectRef.current.contains(e.target))
      );

      if (isCLickOutside && selectRef.current) {
        selectRef.current.blur();
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="dropdown"
      style={{
        width: `${width}px`,
      }}
    >
      <label
        className="dropdown__label"
      >
        <span className="dropdown__label-text">
          {label}
        </span>

        <select
          name={label}
          value={value}
          ref={selectRef}
          className="dropdown__select"
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onClick={() => hadnleSelectClick()}
        >
          {options.map((option) => (
            <option
              value={option.value}
              key={option.value}
              className="dropdown__option"
            >
              {option.label}
            </option>
          ))}
        </select>

        <Icon
          iconName={isOpen ? 'arrowUp' : 'arrowDown'}
          classNames="dropdown__arrow"
        />
      </label>
    </div>
  );
};
