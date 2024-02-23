import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';

import './DropDown.scss';
import { getKeyByValue } from '../../utils/getKeyByValue';

type DropProps<T> = {
  label: string,
  value: T;
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
  const selectRef = useRef<HTMLDivElement>(null);
  const currentValueTitle = getKeyByValue(options, value);

  const handleSelectValue = (selectedValue: {
    value: T;
    label: string;
  }) => {
    setValue(selectedValue.value as T);
    setIsOpen(false);
  };

  const hadnleOnSelectClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isCLickOutside = !(selectRef.current
        && e.target
        && e.target instanceof HTMLElement
        && (selectRef.current.contains(e.target))
      );

      if (isCLickOutside && selectRef.current) {
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

        <div
          className="dropdown__select"
          role="presentation"
          onClick={() => hadnleOnSelectClick()}
          ref={selectRef}
        >
          <span>{currentValueTitle}</span>

          {isOpen && (
            <ul className="dropdown__option-list">
              {options.map((option) => (
                <li
                  value={option.value}
                  key={option.value}
                  className="dropdown__option-item"
                  role="presentation"
                  onClick={() => handleSelectValue(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Icon
          iconName={isOpen ? 'arrowUp' : 'arrowDown'}
          classNames="dropdown__arrow"
        />
      </label>
    </div>
  );
};
