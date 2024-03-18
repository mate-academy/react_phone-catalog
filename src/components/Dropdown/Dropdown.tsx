import { useState } from 'react';
import arrowDown from '../../img/arrowDown.png';
import arrowUp from '../../img/arrowUp.png';
import './dropdown.scss';

type Props<T> = {
  selected: T;
  setSelected: (value: T) => void;
  values: T[];
  title: string;
};

export const Dropdown = <T extends string | number>({
  selected,
  setSelected,
  values,
  title,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlebtnClick = () => {
    setIsOpen(!isOpen);
  };

  const changeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const celectedValue = e.currentTarget.textContent as T;

    setSelected(celectedValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__title">{title}</p>
      <div className="dropdown__wrapper">
        <button
          type="button"
          className="dropdown__select-item"
          onClick={handlebtnClick}
        >
          <p className="dropdown__selected">{selected}</p>
          <img
            src={isOpen ? arrowUp : arrowDown}
            alt="arrow-icon"
            className="dropdown__arrow"
          />
        </button>

        {isOpen && (
          <div className="dropdown__options">
            {values.map(value => (
              <button
                type="button"
                key={value}
                className="dropdown__option"
                onClick={changeSelect}
              >
                {value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
