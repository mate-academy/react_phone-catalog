import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect';

const items = ['Item 1', 'Hover Item', 'Item 3', 'Item 4'];

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev === null || prev === items.length - 1 ? 0 : prev + 1,
        );

        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev === null || prev === 0 ? items.length - 1 : prev - 1,
        );

        break;

      case 'Enter':
        if (highlightedIndex !== null) {
          handleSelect(items[highlightedIndex]);
        }

        break;

      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(null);

        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="select-button button--arrow-bottom"
      >
        {selected}
      </button>

      <div ref={dropdownRef} className={`dropdown ${isOpen ? 'open' : ''}`}>
        {items.map((item, index) => (
          <div
            key={item}
            onClick={() => handleSelect(item)}
            className={`dropdown-item
              ${selected === item ? 'selected' : ''}
              ${highlightedIndex === index ? 'highlighted' : ''}
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
