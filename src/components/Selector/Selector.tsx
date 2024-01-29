import React, { useState } from 'react';
import cn from 'classnames';

import './Selector.scss';

interface SelectorProps {
  searchParamName: string;
  title: string;
  options: Record<string, string>;
  defaultOptionKey: string;
  setParams: (key: string, value: string) => void;
}

const CustomSelector: React.FC<SelectorProps> = ({
  searchParamName,
  title,
  options,
  defaultOptionKey,
  setParams,
}) => {
  const [selectedOption, setSelectedOption]
    = useState(options[defaultOptionKey]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (key: string, value: string) => {
    setSelectedOption(value);
    setShowOptions(false);

    setParams(searchParamName, key);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="select">
      <div className="select__label">
        {`${title}:`}
      </div>
      { /* eslint-disable-next-line */ }
      <button
        className={cn('select__current', {
          'select__current--opened': showOptions,
        })}
        onClick={toggleOptions}
      >
        {selectedOption}
      </button>

      <div className="select__wrapper">
        <div className={cn('select__options', {
          'select__options--active': showOptions,
        })}
        >
          {Object.entries(options).map(([key, value]) => (
            /* eslint-disable-next-line */
            <button
              key={key}
              className="select__option"
              onClick={() => handleOptionClick(key, value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <input
        type="hidden"
        name={searchParamName}
        value={selectedOption}
      />
    </div>
  );
};

export default CustomSelector;
