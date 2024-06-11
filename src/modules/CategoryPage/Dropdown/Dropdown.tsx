import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Option } from '../../../types/Option';
import { IconDown, IconUp } from '../../shared/IconsSVG';

type Props = {
  title: string;
  currentValue: string;
  options: Option[];
  setSelectedCriteria: (value: string) => void;
};

export const Dropdown: React.FC<Props> = React.memo(
  ({ title, options, currentValue, setSelectedCriteria }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState(currentValue);
    const [styles, setStyles] = useState<CSSProperties>({
      overflow: 'hidden',
      border: 'none',
    });
    const focus = useRef<HTMLDivElement>(null);

    const handleSelectItems = (event: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = event.currentTarget;
      const newValue = options[+value].value;

      if (newValue !== selectedValue) {
        setSelectedValue(options[+value].value);
        setSelectedCriteria(options[+value].criteria);
      }

      setIsOpenDropdown(false);
    };

    useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isOpenDropdown) {
        setStyles({ overflow: 'hidden', border: '1px solid #b4bdc3' });
      }

      if (!isOpenDropdown) {
        setTimeout(() => {
          setStyles({ overflow: 'hidden', border: 'none' });
        }, 280);
      }

      return () => clearTimeout(timeout);
    }, [isOpenDropdown]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (focus.current && !focus.current.contains(event.target as Node)) {
          setIsOpenDropdown(false);
        }
      };

      document.addEventListener('mouseup', handleClickOutside);

      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      };
    }, []);

    return (
      <div className="dropdown" ref={focus}>
        <span className="dropdown__title">{title}</span>
        <div className="dropdown__items-container">
          <button
            type="button"
            className="dropdown__selected"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            <div className="dropdown__selected-item">{selectedValue}</div>

            {isOpenDropdown ? (
              <div className="dropdown__move">
                <IconUp />
              </div>
            ) : (
              <div className="dropdown__move">
                <IconDown />
              </div>
            )}
          </button>

          <div className="dropdown__items" style={isOpenDropdown ? {} : styles}>
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                value={index}
                onClick={handleSelectItems}
                className="dropdown__item"
                style={isOpenDropdown ? { height: '32px' } : { height: 0 }}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
