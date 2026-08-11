import { useEffect, useRef, useState } from 'react';
import scss from './Dropdowns.module.scss';
import classNames from 'classnames';

type Option = {
  value: string;
  label: string;
};

interface Props {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const Dropdowns: React.FC<Props> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsKeyboardMode(false);
  };

  const currentSelectedOption = options.find(
    option => option.value === selectedValue,
  );

  const [activeIndex, setActiveIndex] = useState<number>(
    options.findIndex(option => option.value === selectedValue),
  );

  const handleSelectOption = (value: string) => {
    onSelect(value);
    const newIndex = options.findIndex(option => option.value === value);

    setActiveIndex(newIndex);
    setIsOpen(false);
  };

  useEffect(() => {
    const newIndex = options.findIndex(
      option => option.value === selectedValue,
    );

    setActiveIndex(newIndex > -1 ? newIndex : 0);
  }, [selectedValue, options]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex(prev => {
            if (prev === options.length - 1) {
              return 0;
            }

            return prev + 1;
          });
          setIsKeyboardMode(true);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex(prev => {
            if (prev === 0) {
              return options.length - 1;
            }

            return prev - 1;
          });
          setIsKeyboardMode(true);
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'Enter':
          event.preventDefault();
          onSelect(options[activeIndex].value);
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case ' ':
          event.preventDefault();
          onSelect(options[activeIndex].value);
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          setIsKeyboardMode(true);
          break;
        case 'End':
          event.preventDefault();
          setActiveIndex(options.length - 1);
          setIsKeyboardMode(true);
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, options, activeIndex, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, triggerRef, menuRef]);

  return (
    <div className={scss.dropdown} tabIndex={-1}>
      <span className={scss.dropdown__label}>{label}</span>
      <button
        type="button"
        className={scss.dropdown__trigger}
        aria-haspopup="listbox"
        onClick={handleToggle}
        ref={triggerRef}
      >
        {currentSelectedOption?.label || 'Choose..'}
        <svg className={scss.dropdown__arrow}>
          <use href={`${import.meta.env.BASE_URL}icons/icons.svg#arrow`}></use>
        </svg>
      </button>

      {isOpen && (
        <ul
          className={scss.dropdown__menu}
          role="listbox"
          ref={menuRef}
          onMouseMove={() => setIsKeyboardMode(false)}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              className={classNames(scss.dropdown__menuItem, {
                [scss.dropdown__menuItem__active]:
                  activeIndex === i && isKeyboardMode,
              })}
              role="option"
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
