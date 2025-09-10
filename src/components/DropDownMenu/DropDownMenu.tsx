import React, { useEffect, useRef, useState } from 'react';

import './DropDownMenu.scss';
import classNames from 'classnames';

type Props = {
  options: string[];
  selected: string;
  handleChange: (arg: string) => void;
};

export const DropDownMenu: React.FC<Props> = ({
  options,
  selected,
  handleChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <button
        className={classNames('dropdown__button', {
          'dropdown__button--active': isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected}
      </button>

      {isOpen && (
        <div className="dropdown__content" ref={dropdownRef}>
          <ul className="content">
            {options.map(option => (
              <li
                key={option}
                className={`content__item ${selected === option ? 'content__item--selected' : ''}`}
                onClick={() => {
                  // setSelected(option);
                  setIsOpen(false);
                  handleChange(option);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
