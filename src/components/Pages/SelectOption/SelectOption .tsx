import { useEffect, useRef, useState } from 'react';
import style from './SelectOption.module.scss';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  value: SelectOption;
  onChange: (option: SelectOption) => void;
  className?: string;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${style.select} ${className}`} ref={rootRef}>
      <button
        type="button"
        className={`${style.control} ${isOpen ? style.controlOpen : ''}`}
        onClick={() => setIsOpen(current => !current)}
      >
        <span className={style.controlLabel}>{value.label}</span>
        <span className={`${style.arrow} ${isOpen ? style.arrowUp : ''}`}>
          ⌄
        </span>
      </button>

      {isOpen && (
        <ul className={style.menu}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={`${style.option} ${
                  option.value === value.value ? style.optionSelected : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
