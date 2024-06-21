import { useEffect, useRef, useState } from 'react';
import './Select.scss';
import classNames from 'classnames';

type Value = { [key: string]: string };

type Props = {
  handleChange?: (newValue: string | number) => void;
  values?: Value;
  currentValue?: string | number;
};

export const Select: React.FC<Props> = ({
  handleChange: setValue = () => {},
  values = {},
  currentValue = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (newOption: string) => {
    setValue(newOption);
    setIsExpanded(false);
  };

  const handleOuterClick = (event: MouseEvent | TouchEvent) => {
    const target = event.target;

    if (target instanceof Element) {
      if (!selectRef.current?.contains(target)) {
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOuterClick);
    document.addEventListener('touchstart', handleOuterClick);

    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
      document.removeEventListener('touchstart', handleOuterClick);
    };
  }, []);

  return (
    <div className="select" ref={selectRef}>
      <span className="select__name">Sort by</span>

      <div className="select__content-wrapper">
        <button
          className={classNames('select__button', { active: isExpanded })}
          role="combobox"
          aria-labelledby="select button"
          aria-haspopup="listbox"
          aria-expanded={isExpanded}
          aria-controls="select-dropdown"
          onClick={() => {
            setIsExpanded(current => !current);
          }}
        >
          {values[currentValue]}
        </button>

        <ul className={classNames('select__dropdown', { hidden: !isExpanded })}>
          {Object.entries(values).map(option => (
            <li
              className={classNames('select__dropdown-item', {
                active: `${currentValue}` === `${option[0]}`,
              })}
              key={option[0]}
            >
              <label
                className="select__label"
                onClick={() => {
                  handleOptionClick(option[0]);
                }}
              >
                {option[1]}
                <input
                  type="radio"
                  className="select__option"
                  name="test"
                  value={option[0]}
                ></input>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
