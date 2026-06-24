import { FC, useContext, useEffect, useRef } from 'react';
import cn from 'clsx';
import { Button } from '../Button/Button';
import ArrowUp from '/src/images/icons/arrow-up.svg?react';
import ArrowDown from '/src/images/icons/arrow-down.svg?react';
import { DropdownContext } from '../../../contexts/DropdownContext';

type DropdownProps = {
  id: string;
  label?: string;
  options: { [key: string]: string };
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown: FC<DropdownProps> = ({
  id,
  label = '',
  options,
  value,
  onChange,
  className,
}) => {
  const selectedOption = Object.values(options).includes(value) ? value : '';

  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDropdownOpen = activeDropdown === id;
  const hasLabel = !!label && label.length > 0;

  const toggleDropdown = () => {
    setActiveDropdown(isDropdownOpen ? null : id);
  };

  const handleClick = (clickedValue: string) => {
    onChange(clickedValue);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, setActiveDropdown]);

  return (
    <div
      ref={dropdownRef}
      className={cn('relative flex flex-col gap-1', className)}
    >
      {hasLabel && (
        <span className="text-small text-secondary dark:text-d-secondary">
          {label}
        </span>
      )}

      <Button
        onClick={toggleDropdown}
        className={cn(
          'text-buttons text-primary dark:text-d-white dark:bg-d-surface2 flex h-10 cursor-pointer items-center justify-between bg-white px-3 shadow-inner transition',
          isDropdownOpen
            ? 'dark:shadow-d-accent shadow-primary'
            : 'dark:hover:shadow-d-icons hover:shadow-secondary shadow-elements dark:shadow-transparent',
        )}
      >
        {Object.keys(options).find(key => options[key] === selectedOption) ||
          'Select'}
        {isDropdownOpen ? (
          <ArrowUp className="fill-icons dark:fill-d-secondary size-4" />
        ) : (
          <ArrowDown className="fill-icons dark:fill-d-secondary size-4" />
        )}
      </Button>

      <ul
        className={cn(
          isDropdownOpen
            ? 'border-icons dark:border-d-elements dark:bg-d-black absolute -bottom-1 z-20 flex w-full translate-y-full flex-col border bg-white py-2 shadow-[0_2px_15px_0] shadow-[#0000000D]'
            : 'hidden',
        )}
      >
        {Object.entries(options).map(([optionKey, optionValue]) => (
          <li key={optionValue}>
            <Button
              onClick={() => handleClick(optionValue)}
              className="hover:bg-hover-bg dark:hover:bg-d-surface2 dark:bg-d-black text-body text-secondary dark:text-d-secondary hover:text-primary dark:hover:text-d-white size-full h-8 bg-white px-3 text-left transition"
            >
              {optionKey}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
