import { useState } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { DropDownOptionType } from '../../types/DropDownType';

import './Dropdown.scss';

type Props = {
  title: string;
  selectedValue: string;
  options: DropDownOptionType[];
  setValue: (v: string) => void;
  isSmall?: boolean;
};

export const Dropdown: React.FC<Props> = ({
  title,
  selectedValue,
  options,
  setValue,
  isSmall = false,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleMouseDown = (
    option: DropDownOptionType,
  ) => () => {
    setValue(option.value);
    setIsSelected(false);
  };

  return (
    <div
      className={classnames('Dropdown', {
        'Dropdown--small': isSmall,
      })}
      onBlur={handleBlur}
    >
      <span className="Dropdown__title">
        {title}
      </span>

      <button
        type="button"
        className={classnames('Dropdown__button', {
          'Dropdown__button--selected': isSelected,
        })}
        onClick={handleClick}
      >
        {selectedValue}
      </button>

      <div className="Dropdown__options-container">
        <CSSTransition
          in={isSelected}
          classNames="Dropdown__options"
          timeout={300}
          unmountOnExit
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
        >
          <div className="Dropdown__options">
            {options.map(option => (
              <button
                key={option.name}
                type="button"
                className="Dropdown__option"
                onMouseDown={handleMouseDown(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
