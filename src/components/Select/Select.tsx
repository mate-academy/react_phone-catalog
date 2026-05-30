import { useState, useRef, useEffect, KeyboardEvent } from 'react';

import ArrowDown from '../../assets/Icons/Arrow_down.svg';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
  },
  trigger: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '10px 14px',
    background: '#ffffff',
    border: '1.5px solid',
    borderColor: '#B4BDC3',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    color: '#111827',
    fontSize: '14px',
  },
  triggerHover: {
    borderColor: '#111827',
  },
  triggerFocus: {
    borderColor: '#111827',
  },
  triggerDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    background: '#f9fafb',
  },
  triggerValue: {
    color: '#111827',
    fontWeight: 500,
  },
  triggerPlaceholder: {
    color: '#6b7280',
    fontWeight: 400,
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: '#ffffff',
    border: '1.5px solid #d1d5db',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    padding: '4px',
    margin: 0,
    listStyle: 'none',
    zIndex: 9999,
  },
  option: {
    padding: '9px 12px',
    cursor: 'pointer',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: 400,
    transition: 'background 0.1s ease, color 0.1s ease',
    userSelect: 'none',
  },
  optionHovered: {
    background: '#fafbfc',
    color: '#111827',
    fontWeight: 500,
  },
  optionDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <img
      src={ArrowDown}
      alt="arrow_down"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
        color: '#6b7280',
        filter: 'brightness(0)',
      }}
    />
  );
}

export const Select = ({
  options,
  value,
  placeholder = 'Default',
  disabled = false,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHoveredIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHoveredIndex(null);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }

      setHoveredIndex(prev => {
        const next = prev === null ? 0 : Math.min(prev + 1, options.length - 1);

        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex(prev => {
        const next = prev === null ? options.length - 1 : Math.max(prev - 1, 0);

        return next;
      });
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value);
    setIsOpen(false);
    setHoveredIndex(null);
  };

  return (
    <div
      ref={containerRef}
      style={styles.wrapper}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        style={{
          ...styles.trigger,
          ...(isOpen ? styles.triggerFocus : {}),
          ...(disabled ? styles.triggerDisabled : {}),
          ...(isHovered ? styles.triggerHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (!disabled) {
            setIsOpen(prev => !prev);
          }
        }}
        aria-label={selectedOption?.label ?? placeholder}
      >
        <span
          style={
            selectedOption ? styles.triggerValue : styles.triggerPlaceholder
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul role="listbox" style={styles.dropdown}>
          {options.map((option, idx) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              style={{
                ...styles.option,
                ...(option.disabled ? styles.optionDisabled : {}),
                ...(hoveredIndex === idx && !option.disabled
                  ? styles.optionHovered
                  : {}),
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// export default function App() {
//   const [val1, setVal1] = useState<string>('');

//   const options = [
//     { value: 'item1', label: 'Item' },
//     { value: 'item2', label: 'Hover Item' },
//     { value: 'item3', label: 'Item', disabled: true },
//     { value: 'item4', label: 'Item' },
//   ];

//   return (
//     <div
//       style={{
//         padding: '48px',
//         display: 'flex',
//         gap: '24px',
//         alignItems: 'flex-start',
//         flexWrap: 'wrap',
//         background: '#f9fafb',
//         minHeight: '100vh',
//       }}
//     >
//       <Select
//         options={options}
//         value={val1}
//         placeholder="Default"
//         onChange={setVal1}
//       />
//     </div>
//   );
// }
