import { FC, useEffect, useRef, useState } from 'react';
import { Option } from '../../../../types/Options';
import s from './CustomSelect.module.scss';

interface Props {
  options: Option[];
  onSelect: (value: string) => void;
  value: string;
  placeholder?: string;
}

export const CustomSelect: FC<Props> = ({
  options,
  onSelect,
  value,
  placeholder = '',
}) => {
  const selectedOption = options.find(o => o.value === value) || null;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(
    selectedOption,
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleOptionClick = (option: Option, index: number) => {
    setSelectedValue(option);
    onSelect(option.value);
    setIsOpen(false);
    setFocusedIndex(index);
  };

  /* --- Outside click listener --- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  /* --- Keyboard navigation --- */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        setIsOpen(true);
        setFocusedIndex(0);
      }

      return;
    }

    if (e.key === 'ArrowDown') {
      setFocusedIndex(prev => (prev + 1) % options.length);
    }

    if (e.key === 'ArrowUp') {
      setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
    }

    if (e.key === 'Enter') {
      const option = options[focusedIndex];

      if (option) {
        handleOptionClick(option, focusedIndex);
      }
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  /* Auto-scroll to focused item */
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const items = listRef.current.querySelectorAll('li');
      const item = items[focusedIndex] as HTMLElement;

      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={containerRef}
      className={`${s.customSelectContainer} ${isOpen ? s.open : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={s.selectedValue} onClick={handleToggle}>
        {selectedValue ? selectedValue.label : placeholder}
      </div>

      {isOpen && (
        <ul className={s.optionsList} ref={listRef}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={focusedIndex === index ? s.focused : ''}
              onClick={() => handleOptionClick(option, index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
