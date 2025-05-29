import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { SearchLink } from '../../store/SearchLink';

type Props = {
  title: string;
  options: string[];
  functional: string;
  onChange: (option: string) => {};
};

export const SelectionDropdown: React.FC<Props> = ({
  title,
  options,
  functional,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(functional);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="selectionDropdown"
      tabIndex={0}
      ref={ref}
      onBlur={handleOnBlur}
    >
      <div className="selectionDropdown__title">{title}</div>
      <div
        className={classNames('selectionDropdown__main', {
          dropdownActive: isOpen,
        })}
        onClick={handleToggle}
      >
        <div>{selectedOption}</div>
        <div
          className={classNames('selectionDropdown__main--icon', {
            iconActive: isOpen,
          })}
        ></div>
      </div>
      {isOpen && (
        <ul className="selectionDropdown__list">
          {options.map(option => (
            <SearchLink params={onChange(option)} key={option}>
              <li
                className={classNames('selectionDropdown__list--option', {
                  optionActive: option === selectedOption,
                })}
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </li>
            </SearchLink>
          ))}
        </ul>
      )}
    </div>
  );
};
