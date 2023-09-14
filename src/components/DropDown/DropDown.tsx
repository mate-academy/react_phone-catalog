import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import './DropDown.scss';

import { Option } from '../../types/SortTypes';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  options: Option[],
  startValue: string,
  searchName: string,
  label: string,
};

export const DropDown: React.FC<Props> = ({
  options,
  startValue,
  searchName,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(startValue);
  const [searchParams] = useSearchParams();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
    searchParams.set('page', '1');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const paramsValue = searchParams.get(searchName);

    if (paramsValue
      && options.find(currentOption => currentOption.value === paramsValue)) {
      setSelectedOption(paramsValue);
    } else {
      setSelectedOption(startValue);
    }
  }, [
    options,
    searchName,
    startValue,
    searchParams,
  ]);

  return (
    <div className="drop-down">
      <label htmlFor="title" className="drop-down--title">
        {label}
      </label>

      <button
        type="button"
        className="drop-down__top"
        onClick={toggleDropDown}
      >
        <span className="drop-down--current">
          {selectedOption}
        </span>

        <div className="drop-down--icon" />
      </button>

      <ul
        className={classNames('drop-down__content', {
          'drop-down--is-active': !isOpen,
        })}
      >
        {options.map(currentOption => (
          <li key={currentOption.label}>
            <Link
              className="drop-down--item"
              to={{
                search: getSearchWith(
                  searchParams,
                  { [searchName]: currentOption.value },
                ),
              }}
              onClick={() => handleOptionSelect(currentOption.value)}
            >
              {currentOption.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
