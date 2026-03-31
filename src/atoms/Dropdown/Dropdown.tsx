import { useEffect, useRef, useState } from 'react';
import s from './Dropdown.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';

type OptionValue = string | number;

type Props = {
  label: string;
  options: OptionValue[];
  value?: OptionValue;
  defaultValue: OptionValue;
  onClick?: (option: OptionValue) => void;
};

const Dropdown = ({ label, options, defaultValue, value, onClick }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedValue = value ?? defaultValue;

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleOptionClick = (option: OptionValue) => {
    onClick?.(option);
    setOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className={s.base}>
      <label htmlFor={`dropdown-${label}`} className={s.label}>{label}</label>
      <div ref={rootRef} className={s.root}>
        <div className={s.root__sizer} aria-hidden="true">
          {options.map((o, index) => (
            <div className={s.root__sizerOption} key={`${o}-sizer-${index}`}>
              {o}
            </div>
          ))}
        </div>
        <div
          className={`${s.wrapper} ${isOpen ? s.wrapper__active : ''}`}
          onClick={handleToggle}
        >
          <div className={s.dropdown}>
            <label htmlFor={`dropdown-${label}`} className={s.dropdown__label}>
              {selectedValue}
            </label>
            <Chevron className={s.dropdown__chevron} />
          </div>
        </div>
        {isOpen && (
          <div className={s.root__modal}>
            <div id={`dropdown-${label}`} className={s.modal}>
              {options.map((o, index) => (
                <div className={s.root__option} key={`${o}-${index}`} onClick={() => handleOptionClick(o)}>
                  <div className={s.option}>{o}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
