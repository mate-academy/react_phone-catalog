import React, { useEffect, useRef, useState } from 'react';
import style from './Selects.module.scss';
import classNames from 'classnames';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
import { Option } from '../../types/Option';

type Props = {
  options: Option[];
  width: string;
  value: string;
  onChange: (newValue: string) => void;
};

export const Select: React.FC<Props> = ({
  options,
  width,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
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

  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption =
    options.find(option => option.value === value) || options[0];

  return (
    <>
      <div
        ref={selectRef}
        className={style.select}
        style={isMobile ? { width: '136px' } : { width: width }}
      >
        <button
          className={classNames(style.select__button, {
            [style.select__button__active]: isOpen,
          })}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <p className={style.select__title}>{selectedOption.label}</p>
          {isOpen ? (
            <img src="/img/arrow-up.svg" alt="arrow-up" />
          ) : (
            <img src="/img/arrow-down.svg" alt="arrow-down" />
          )}
        </button>

        <div
          className={classNames(style.select__content, {
            [style.select__content__active]: isOpen,
          })}
        >
          {options.map(option => (
            <p
              key={option.value}
              className={style.select__option}
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
