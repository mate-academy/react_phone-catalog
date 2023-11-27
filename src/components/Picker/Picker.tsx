import './Picker.scss';

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/getSearchWith';

type Props = {
  options: string[],
  label: string,
  startValue: string,
  searchParamsKey: string,
};

export const Picker: React.FC<Props> = ({
  options,
  label,
  startValue,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(startValue);
  const [searchParams] = useSearchParams();

  const togglePicker = () => {
    setIsOpen(!isOpen);
    searchParams.set('page', '1');
  };

  return (
    <div className="picker">
      <div className="picker__label">
        {label}
      </div>

      <button
        type="button"
        className="picker__select"
        onClick={togglePicker}
      >
        {value}

        <img
          src="img/icons/arrow_down.svg"
          className={classNames(
            'picker__arrow',
            { 'picker__arrow--open': isOpen },
          )}
          alt="arrow"
        />
      </button>

      {isOpen && (
        <ul className="picker__list">
          {options.map(option => (
            <li
              key={option}
              aria-hidden="true"
              className="picker__item"
              onClick={() => {
                setIsOpen(false);
                setValue(option);
              }}
            >
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    { [searchParamsKey]: option },
                  ),
                }}
                className="picker__link"
              >
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
