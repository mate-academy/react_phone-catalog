import { useEffect, useRef, useState } from 'react';
import './DropDown.scss';
import classNames from 'classnames';

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const DropDown = ({ value, options, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={classNames('dropdown__button', {
          'dropdown__button--active': isOpen,
        })}
        onClick={() => setIsOpen(current => !current)}
      >
        {selectedOption?.label}

        <img
          className="dropdown__arrow"
          src={isOpen ? 'img/icons/arrow-up.svg' : 'img/icons/arrow-down.svg'}
          alt="Dropdown arrow"
        />
      </button>

      {isOpen && (
        <ul className="dropdown__list">
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={classNames('dropdown__option', {
                  'dropdown__option--active': option.value === value,
                })}
                onClick={() => {
                  onChange(option.value);

                  setIsOpen(false);
                }}
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
