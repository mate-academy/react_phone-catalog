import { useState, useRef, useEffect } from 'react';
import './Select.scss';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}
export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`select ${isOpen ? 'select--open' : ''}`} ref={ref}>
      <div className="select" ref={ref}>
        <button
          className="select__button"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {selectedOption?.label}
          <span
            className={`select__arrow ${isOpen ? 'select__arrow--open' : ''}`}
          ></span>
        </button>
        {isOpen && (
          <ul className="select__list">
            {options.map(option => (
              <li key={option.value}>
                <button
                  className={`select__option ${option.value === value ? 'select__option--active' : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
