import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Option } from '../../types/Option';

import './Selector.scss';

type Props = {
  label: string;
  options: Option[];
  selectedOption: string;
  onChangeOption: (value: string) => void;
  defaultText: string;
};

export const Selector: React.FC<Props> = ({
  label,
  options,
  selectedOption,
  onChangeOption,
  defaultText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selector = useRef<HTMLDivElement>(null);

  const handleOutsideSelectorClick = (e: MouseEvent) => {
    if (e.target !== selector.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideSelectorClick);

    return () =>
      document.removeEventListener('click', handleOutsideSelectorClick);
  }, []);

  return (
    <div className="selector">
      <label className="selector__label">{label}</label>
      <div
        className={classNames('selector__selected', {
          'selector__selected--active': isOpen,
        })}
        ref={selector}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {options.find(option => option.value === selectedOption)?.name ||
          defaultText}
      </div>
      {isOpen && (
        <ul className="selector__options">
          {options.map(({ value, name }) => (
            <li
              className="selector__option"
              key={value}
              onClick={() => {
                onChangeOption(value);
                setIsOpen(false);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
