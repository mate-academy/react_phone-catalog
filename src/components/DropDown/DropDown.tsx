import { useState } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';
import { DropDownOption } from '../../types/DropDownOptions';
import './Dropdown.scss';

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
      className={classNames(
        'dropdown',
        { 'dropdown--small': isSmall },
      )}
      onBlur={handleBlur}
    >
      <button
        className={classNames(
          'dropdown__button',
          { 'dropdown__button--active': isSelected },
        )}
        type="button"
        onClick={handleClick}
      >
        <span>
          {optionName}
        </span>

        {isSelected
          ? <ReactSVG src="img/icons/Chevron (Arrow Up).svg" />
          : <ReactSVG src="img/icons/Chevron (Arrow Down).svg" />}
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
              className="dropdown__option"
              type="button"
              onClick={() => handleSelectChange(value)}
            >
              {name}
            </button>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};
