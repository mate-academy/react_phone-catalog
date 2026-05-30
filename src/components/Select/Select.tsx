import React, { useEffect, useRef, useState } from 'react';
import './Select.scss';
import { OptionType } from '../../types/OptionType';
import classNames from 'classnames';

type Props = {
  id?: string;
  options: OptionType[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<Props> = ({
  id,
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = options.filter(
    option => option.value !== selectedValue,
  );

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="select" id={id} ref={selectRef}>
      <button
        className={classNames('select__button text text__body--buttons', {
          'select__button--open': isOpen,
        })}
        onClick={toggleDropdown}
      >
        {options.find(option => option.value === selectedValue)?.label}
      </button>

      <ul className={classNames('select__options', { open: isOpen })}>
        {filterOptions.map(option => (
          <li
            key={option.value}
            className={classNames(
              'select__option',
              'text',
              'text__body--buttons',
              {
                selected: option.value === selectedValue,
              },
            )}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
