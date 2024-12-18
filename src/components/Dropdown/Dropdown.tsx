import React, { useState } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';

type Props = {
  options: string[];
};

export const Dropdown: React.FC<Props> = ({ options }) => {
  const [selected, setSelected] = useState(options[0]);
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
        {selected}
        <img
          className="dropdown__icon"
          src="/icons/arrow_down.svg"
          alt="Arrow down"
        />
      </button>

      {opened && (
        <div className="dropdown__container">
          {options.map((option, index) => (
            <div
              className="dropdown__item"
              onClick={() => {
                setSelected(option);
                setOpened(false);
              }}
              key={index}
              tabIndex={index}
            >
              <p
                className={classNames(
                  'dropdown__item-text body-text slim-text',
                  {
                    'dropdown__item-text--selected': option === selected,
                  },
                )}
              >
                {option}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
