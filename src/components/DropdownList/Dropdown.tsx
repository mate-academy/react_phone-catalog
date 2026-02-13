import React, { useEffect, useRef, useState } from 'react';
import style from './Dropdown.module.scss';
import arrowUp from '../../shared/icons/chevron-arrow-up.svg';
import arrowDown from '../../shared/icons/chevron-arrow-down.svg';

type Props = {
  options: string[];
  selected: string;
  onSelect: (item: string) => void;
  title: string;
};

export const Dropdown: React.FC<Props> = ({ options, selected, onSelect, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={style.dropdown} ref={dropdownRef}>
      <p className={style.title}>{title}</p>
      <button className={style.selected} onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <span className={style.arrow}>
          {isOpen ? (
            <img src={arrowUp} alt="arrowUp icon" className={style.icon} />
          ) : (
            <img src={arrowDown} alt="arrowDown icon" className={style.icon} />
          )}
        </span>
      </button>

      {isOpen && (
        <ul className={style.menu}>
          {options.map(option => (
            <li
              key={option}
              className={option === selected ? style.active : ''}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
