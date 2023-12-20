/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import './DropDown.scss';
import classNames from 'classnames';
import arrowDown from './DropDownImg/arrow.svg';

type Props = {
  options: string[];
  label: string;
  startValue: string;
  selectChange: (selectedOption: string) => void;
};

export const DropDown: React.FC<Props> = ({
  options,
  label,
  startValue,
  selectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [value, setValue] = useState(startValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('click', handleClickOutside);
    } else {
      document.body.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <p className="dropdown__label">{label}</p>
      <button
        className={classNames('dropdown__select', {
          'dropdown__select--active': isOpen,
        })}
        type="button"
        onClick={toggle}
      >
        {value}

        <img
          src={arrowDown}
          alt="arrow"
          className={classNames('dropdown__arrow', {
            'dropdown__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className="dropdown__list">
          {options.map((option: string) => (
            <button
              className="dropdown__list-option"
              key={option}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
                selectChange(option);
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

      )}
    </div>
  );
};
