import React, { useState } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';

type Props = {
  options: string[];
  value: any;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(!opened);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpened(false);
    }
  };

  return (
    <div className="dropdown" onBlur={handleBlur}>
      <button
        className={classNames('dropdown__button button--white', {
          'dropdown__button--opened': opened,
        })}
        onClick={handleOpen}
      >
        {value}
        <img
          className="dropdown__icon"
          src="icons/arrow_down.svg"
          alt="Arrow down"
        />
      </button>

      {opened && (
        <nav className="dropdown__container" aria-label="Dropdown menu">
          {options.map((option, index) => (
            <ul
              className="dropdown__item"
              onClick={() => {
                onChange(option);
                setOpened(false);
              }}
              key={index}
              tabIndex={index}
            >
              <li
                className={classNames(
                  'dropdown__item-text body-text slim-text',
                  {
                    'dropdown__item-text--selected':
                      option === value.toString(),
                  },
                )}
              >
                {option}
              </li>
            </ul>
          ))}
        </nav>
      )}
    </div>
  );
};
