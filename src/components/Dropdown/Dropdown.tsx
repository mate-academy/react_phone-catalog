import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import './Dropdown.scss';

type Props = {
  title: string,
  defaultValue: string,
  selectedValue: string,
  options: DropDownOptionType[],
  setValue: (value: string) => void,
  isSmall?: boolean,
};

export const Dropdown:React.FC<Props> = ({
  title,
  selectedValue,
  defaultValue,
  options,
  setValue,
  isSmall = false,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={classNames(
        'dropdown',
        { 'dropdown--small': isSmall },
      )}
      onBlur={() => {
        setIsSelected(false);
      }}
    >
      <span className="dropdown__title">
        {title}
      </span>
      <button
        type="button"
        className={classNames(
          'dropdown__main-button',
          { 'dropdown__main-button--selected': isSelected },
        )}
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      >
        {selectedValue === '' ? defaultValue : selectedValue}
      </button>
      <div className="dropdown__options-container">
        <CSSTransition
          in={isSelected}
          classNames="dropdown__options"
          timeout={300}
          unmountOnExit
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
        >
          <div className="dropdown__options">
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                className="dropdown__option"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue(option.value);
                  setIsSelected(false);
                }}
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
