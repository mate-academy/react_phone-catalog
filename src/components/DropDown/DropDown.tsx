import React, { useState, memo } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';
import { DropDownOption } from '../../types/DropDownOptions';
import './Dropdown.scss';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../helpers/searchHelpers';

type Props = {
  options: DropDownOption[];
  currentValue: string,
  type: string,
  isSmall?: boolean,
};

export const Dropdown: React.FC<Props> = memo(({
  options, isSmall, currentValue, type,
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

  const createLink = (option: string) => {
    const obj = {} as SearchParams;

    obj[type] = option === 'all'
      ? null
      : option.toString();

    const newParams = { ...obj, page: null };

    return newParams;
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
          {options.map(({ name, value }) => {
            return (
              <SearchLink
                params={createLink(value)}
                className="dropdown__option"
                key={name}
              >
                {name}
              </SearchLink>
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
});
