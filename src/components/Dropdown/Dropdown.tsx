import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';
import classnames from 'classnames';

import { DropDownOption } from '../../types/dropDownOption';
import './dropdown.scss';

type Props = {
  options: DropDownOption[];
  currentValue: string,
  onChange: (v: string) => void,
  isSmall?: boolean,
};

export const Dropdown: React.FC<Props> = ({
  options, isSmall, onChange, currentValue,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const optionName = options.find(option => {
    return option.value === currentValue;
  })?.name || currentValue;

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleSelectChange = (select: string) => {
    onChange(select);
    setIsSelected(false);
  };

  return (
    <div
      className={classnames('dropdown', {
        'dropdown--small': isSmall,
      })}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={classnames('dropdown__button', {
          'dropdown__button--active': isSelected,
        })}
        onClick={handleClick}
      >
        <span className="dropdown__current">
          {optionName}
        </span>

        {isSelected
          ? <ReactSVG src="img/icons/ArrowUp.svg" />
          : <ReactSVG src="img/icons/ArrowDown.svg" />}
      </button>

      <CSSTransition
        in={isSelected}
        timeout={300}
        unmountOnExit
        classNames="dropdown__content"
      >
        <div className="dropdown__content">
          {options.map(({ name, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleSelectChange(value)}
              className="dropdown__option"
            >
              {name}
            </button>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};
