import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss'; // импортируем стили для Dropdown

interface DropdownProps {
  label: string;
  selected: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string; // Дополнительный класс для стилизации
  width?: string; // Пропс для ширины
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  selected,
  options,
  onChange,
  className = '',
  width = 'auto', // Значение по умолчанию для ширины
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Закрытие dropdown при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Закрытие списка
      }
    };

    // Добавляем обработчик кликов на документ
    document.addEventListener('mousedown', handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Открытие и закрытие выпадающего списка
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false); // Закрытие списка после выбора опции
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${className}`}
      style={{ width }}
    >
      <span className="dropdown__label">{label}</span>
      <div className="dropdown__container">
        <button
          className={`dropdown__button ${isOpen ? 'dropdown__button--open' : ''}`}
          onClick={handleButtonClick}
        >
          {selected}
          <span className="dropdown__icon"></span>
        </button>
        {isOpen && (
          <ul className="dropdown__options">
            {options.map(option => (
              <li
                key={option}
                className="dropdown__option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
