import { FC, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import style from './CustomDropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  title: string;
};

export const CustomDropdown: FC<Props> = ({
  value,
  options,
  onChange,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  const toggle = () => setIsOpen(prev => !prev);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={style.dropdown} ref={ref}>
      <p className={style.label}>{title}</p>

      <button className={style.control} onClick={toggle}>
        {selected?.label}
        <div className={style.blockArrow}>
          <span className={cn(style.arrow, { [style.open]: isOpen })} />
        </div>
      </button>

      {isOpen && (
        <ul className={style.menu}>
          {options.map(option => (
            <li
              key={option.value}
              className={cn(style.option, {
                [style.active]: option.value === value,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
