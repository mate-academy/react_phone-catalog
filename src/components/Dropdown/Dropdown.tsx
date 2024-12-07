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

  return (
    <div className="dropdown">
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
                setOpened(false);
                setSelected(option);
              }}
              key={index}
            >
              <p className="body-text">{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
