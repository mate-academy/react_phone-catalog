import { useEffect, useRef, useState } from 'react';
import cl from './CustomSelect.module.scss';

type Props = {
  name: string;
  value: string | number;
  onOptionClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
  options: string[] | number[];
  className?: string;
};

export const CustomSelect: React.FC<Props> = ({
  name,
  value,
  onOptionClick,
  options,
  className,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ref is added to all 3 selects. If click is outside of any of them, close all
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOptionsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    // width is set in ProductPage via grid;
    <div className={`${cl.customSelect} ${className}`}>
      <label htmlFor={name} className={cl.label}>
        {name}
      </label>

      <div
        ref={selectRef}
        className={cl.select}
        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
      >
        <p>{value}</p>
        <svg className={cl.select__arrowDown} />
        <div
          className={`${cl.select__options} ${isOptionsVisible ? cl.select__optionsVisible : ''}`}
        >
          {options.map(option => (
            <div
              key={option}
              className={`${cl.select__option} ${value === option ? cl.select__optionActive : ''}`}
              onClick={onOptionClick}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
