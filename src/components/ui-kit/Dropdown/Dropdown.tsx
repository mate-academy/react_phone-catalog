/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

type Props = {
  title: string,
  options: string[],
  setSelection: (option: string) => void,
  initialOption: string,
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  setSelection,
  initialOption,
}) => {
  const [selected, setSelected] = useState<string>(initialOption);
  const [dropOptions, setDropOptions] = useState(false);

  const handleSelect = (option: string) => () => {
    setSelected(option);
    setSelection(option);
  };

  return (
    <div className="dropdown">
      <label
        className="dropdown__title"
        htmlFor="select"
      >
        {title}
      </label>
      <div
        className="dropdown__input"
        id="select"
        onClick={() => setDropOptions(!dropOptions)}
        tabIndex={0}
        onBlur={() => setDropOptions(false)}
      >
        <>
          <div className="dropdown__selected">{selected}</div>
          {dropOptions && (
            <ul
              className="dropdown__options"
            >
              {options.map(option => (
                <li
                  key={option}
                  value={option}
                  className={classNames('dropdown__option', {
                    'dropdown__option--selected': selected === option,
                  })}
                  onClick={handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </>
      </div>
    </div>
  );
};
