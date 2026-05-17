import { useEffect, useRef, useState } from 'react';
import style from './Select.module.scss';
import { SelectOptions } from '../../../types/selectType';
import { Icons } from '../Icons';
import { Directions, IconId } from '../../../types/icons';

type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SelectOptions) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDivFocus = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkDivFocus);

    return () => {
      document.removeEventListener('mousedown', checkDivFocus);
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        ref={selectRef}
        onClick={() => setIsOpen(prev => !prev)}
        className={`${style.selectTitle} ${isOpen ? style.active : ''}`}
      >
        {value?.label}
        <Icons
          id={IconId.Chevron}
          directions={Directions.Down}
          className={isOpen ? style.selectIconActive : style.selectIcon}
        />
      </div>
      {isOpen && (
        <ul className={style.select}>
          {options.map(option => (
            <li
              onMouseDown={e => e.stopPropagation()}
              onClick={() => {
                handleSelect(option);
              }}
              key={option.value}
              className={style.option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
