import './DropDown.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import arrowDown from '../../images/Icons/button_arrow_down.svg';
import { Option } from '../../types/SortTypes';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  options: Option[]
  label: string
  startValue: string
  searchName: string
};

export const DropDown: React.FC<Props> = ({
  options,
  label,
  startValue,
  searchName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(startValue);
  const [searchParams] = useSearchParams();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
    searchParams.set('page', '1');
  };

  const handleOptionsSelect = (option: string) => {
    setSelectOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const valueFromParams = searchParams.get(searchName);

    if (valueFromParams
       && options.find(option => option.value === valueFromParams)) {
      setSelectOption(valueFromParams);
    } else {
      setSelectOption(startValue);
    }
  }, [searchParams, searchName, options, startValue]);

  return (
    <div className="drop-down">
      <label className=" drop-down__title">
        {label}
      </label>

      <button
        className="drop-down__header"
        type="button"
        onClick={toggleDropDown}
      >
        <span className="drop-down__current">{selectOption}</span>
        <div
          className="drop-down__icon"
        >
          <img src={arrowDown} alt="arrow down" />
        </div>
      </button>

      <ul
        className={classNames('drop-down__body', {
          'drop-down__is-active': !isOpen,
        })}
      >
        {options.map(option => (
          <li
            key={option.label}
          >
            <Link
              className="drop-down__item"
              to={{
                search: getSearchWith(
                  searchParams,
                  { [searchName]: option.value },
                ),
              }}
              onClick={() => handleOptionsSelect(option.value)}
            >
              {option.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
