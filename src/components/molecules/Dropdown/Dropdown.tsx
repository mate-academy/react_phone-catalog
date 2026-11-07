import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon/Icon';
import { ICONS } from '../../../constants/icons';
import cn from 'classnames';

type Props = {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const triggerClassName =
  'flex h-10 w-full items-center justify-between border border-elements bg-white px-3 text-left text-primary hover:border-secondary focus-visible:border-primary focus-visible:outline-none';

const menuClassName =
  'absolute top-full z-10 mt-0.5 w-full overflow-y-auto border border-elements bg-white py-1 shadow-sm';

const optionClassName =
  'group flex h-8 w-full items-center px-3 text-left hover:bg-hover-bg focus-visible:bg-hover-bg focus-visible:outline-none';

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const openMenu = (direction: 'down' | 'up' = 'down') => {
    if (!options.length) return;

    const selectedIndex = options.indexOf(value);

    const index =
      selectedIndex >= 0 ? selectedIndex
      : direction === 'down' ? 0
      : options.length - 1;

    setActiveIndex(index);
    setIsOpen(true);
  };

  const selectedOption = (option: string) => {
    onChange(option);
    closeMenu(true);
  };

  useEffect(() => {
    if (isOpen) {
      const activeOption = optionRefs.current[activeIndex];

      activeOption?.focus();
      activeOption?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!options.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();

        if (isOpen) {
          setActiveIndex((index) => (index + 1) % options.length);
        } else {
          openMenu('down');
        }
        break;

      case 'ArrowUp':
        event.preventDefault();

        if (isOpen) {
          setActiveIndex(
            (index) => (index - 1 + options.length) % options.length,
          );
        } else {
          openMenu('up');
        }
        break;

      case 'Home':
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(0);
        break;

      case 'End':
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;

      case 'Enter':
      case ' ':
        if (!isOpen || activeIndex < 0) return;
        event.preventDefault();
        selectedOption(options[activeIndex]);
        break;

      case 'Escape':
        if (!isOpen) return;
        event.preventDefault();
        closeMenu(true);
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full font-mont"
      onKeyDown={handleKeyDown}
    >
      {label && (
        <Typography
          level="small"
          className="mb-1 block text-secondary"
        >
          {label}
        </Typography>
      )}

      <button
        ref={triggerRef}
        disabled={options.length === 0}
        aria-label={label ?? 'Dropdown'}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn('dark:bg-icons', triggerClassName, {
          'dark:border-accent-dark dark:hover:border-accent-dark': isOpen,
        })}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        type="button"
      >
        <Typography level="button">{value || 'Select an option'}</Typography>
        <Icon
          src={isOpen ? ICONS.ARROW.UP : ICONS.ARROW.DOWN}
          className="size-4 dark:bg-secondary"
          isDisabled
        />
      </button>

      {isOpen && (
        <div
          className={`${menuClassName} ${options.length > 4 ? 'max-h-36' : ''} dark:bg-primary`}
          role="listbox"
        >
          {options.map((option, index) => (
            <button
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              aria-selected={value === option}
              className={`${optionClassName} ${
                activeIndex === index ?
                  'bg-hover-bg dark:bg-surface-2-dark'
                : 'dark:bg-primary'
              } dark:hover:bg-surface-2-dark group`}
              tabIndex={-1}
              key={option}
              onClick={() => selectedOption(option)}
              role="option"
              type="button"
            >
              <Typography
                level="body"
                className="text-secondary group-hover:text-primary group-focus-visible:text-primary dark:group-hover:text-white"
              >
                {option}
              </Typography>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
