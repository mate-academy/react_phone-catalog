import classNames from 'classnames';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { useAppSelector } from '../../app/hooks';
import './selectButton.scss';

interface Props {
  currentOption: string;
  setCurrentOption: (currOption: string) => void;
  options: string[];
}

export const SelectButton: FC<Props> = ({
  options,
  currentOption,
  setCurrentOption,
}) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const selectButtonRef = useRef<HTMLDivElement>(null);
  const theme = useAppSelector(state => state.theme.value);

  const handleSelectClick = () => {
    setToggleSelect(!toggleSelect);
  };

  const handleOptionClick = (option: string) => {
    setCurrentOption(option);
    setToggleSelect(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectButtonRef.current
        && !selectButtonRef.current.contains(event.target as Node)) {
        setToggleSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="select" ref={selectButtonRef}>
      <button
        type="button"
        className={classNames('select__button', `select__button--${theme}`)}
        onClick={handleSelectClick}
      >
        {currentOption}
        <img
          src="/public/_new/img/icons/arrow-down-light.svg"
          alt="Arrow down"
          className={
            classNames('select__arrow',
              { 'select__arrow--transformed': toggleSelect })
          }
        />
      </button>
      {toggleSelect && (
        <ul className={`select__list select__list--${theme}`}>
          {options.map(option => (
            <button
              type="button"
              className={`select__option select__option--${theme}`}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
