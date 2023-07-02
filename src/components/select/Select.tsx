import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import './Select.scss';

import { ReactComponent as ArrowDown }
  from '../../icons/Chevron (Arrow Down).svg';

import { ReactComponent as ArrowUp }
  from '../../icons/Chevron (Arrow Up).svg';

import { FilterType } from '../../types/Select';

type Props = {
  value: string;
  options: string[];
  className: FilterType;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
};

const Select: React.FC<Props> = ({
  value,
  options,
  setPage,
  onSelect,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOpenSelect = () => {
    setIsVisible(current => !current);
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setIsVisible(false);
    setPage(1);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!selectRef?.current?.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const filteredOptions: string[] = options
    .filter(currentValue => currentValue !== value);

  return (
    <div
      className={classNames('select', className)}
      ref={selectRef}
    >
      <div className="control">
        <label className="label">
          {className === 'sorting'
            ? 'Sort by'
            : 'Items on page'}

          <button
            type="button"
            className="select-button"
            onClick={handleOpenSelect}
          >
            {value || 'Choose'}
            {isVisible ? <ArrowUp /> : <ArrowDown />}
          </button>
        </label>

        {isVisible && (
          <div className="options">
            {filteredOptions.map(option => (
              <button
                key={option}
                type="button"
                className="select-button option"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
