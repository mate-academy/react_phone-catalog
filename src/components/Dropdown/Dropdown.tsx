import React, { useState } from 'react';
import cn from 'classnames';
import './Dropdown.scss';

type Props = {
  dropdownItems: string[];
  dropdownLabel: string;
};

const Dropdown: React.FC<Props> = ({ dropdownItems, dropdownLabel }) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<string | number>(dropdownItems[0]);

  return (
    <div className="dropdown">
      <div className="dropdown__description">
        {dropdownLabel}
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        id={dropdownLabel}
        className="dropdown__checkbox"
        onChange={() => setChecked(!isChecked)}
      />
      <label
        htmlFor={dropdownLabel}
        className={cn(
          'dropdown__label',
          { dropdown__label_checked: isChecked },
        )}
      >
        {dropdownValue}
      </label>
      <ul
        className={cn(
          'dropdown__body',
          { dropdown__body_checked: isChecked },
        )}
      >
        {dropdownItems.map(selector => (
          <li
            key={selector}
            className="dropdown__item"
          >
            <button
              type="button"
              className="dropdown__button"
              onClick={() => {
                setDropdownValue(selector);
                setChecked(false);
              }}
            >
              {selector}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
