import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import './CustomSelect.scss';

import { ReactComponent as ArrowDown } from '../../images/icons/arrow-down.svg';

type Option = {
  value: string;
  text: string;
};

interface Props {
  options: Option[];
  onChange: (optionValue: string) => void;
  buttonText: string;
  value: string;
  width: number;
}

export const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  buttonText,
  value,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current
        && !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [selectRef]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      className="custom-select"
      ref={selectRef}
      style={{ width: `${width}px` }}
    >
      <button className="custom-select__button" onClick={toggle} type="button">
        <div className="custom-select__text">{value || buttonText}</div>

        <ArrowDown />
      </button>

      {isOpen && (
        <ul className="custom-select__options-list">
          {options.map((option) => (
            <button
              className="custom-select__option"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                toggle();
              }}
              type="button"
            >
              {option.text}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
