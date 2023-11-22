import './dropDown.scss';
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Option } from '../../types/SortTypes';
import { getSearchWith } from '../../helpers/searchHelper';
import arrowDown from '../../Images/Icons/ArrowDown.svg';

type Props = {
  options: Option[],
  label: string,
  initialValue: string,
  searchName: string,
};

export const DropDown: React.FC<Props> = ({
  options,
  label,
  initialValue,
  searchName,
}) => {
  const [searchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDroopDown = () => {
    setIsOpen(!isOpen);
    searchParams.set('page', '1');
  };

  const handleSelectOption = (option: string) => {
    setSelectOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const value = searchParams.get(searchName);

    if (value && options.find(option => option.value === value)) {
      setSelectOption(value);
    } else {
      setSelectOption(initialValue);
    }
  }, [searchName, initialValue, options, searchParams]);

  return (
    <div className="drop-down">
      <label htmlFor="" className="drop-down__title">
        {label}
      </label>
      <button
        className="drop-down__header"
        type="button"
        onClick={toggleDroopDown}
      >
        <span className="drop-down__current">
          {selectOption}
        </span>
        <div className="drop-down__icon">
          <img src={arrowDown} alt="arrow down" />
        </div>
      </button>

      {isOpen && (
        <ul
          className="drop-down__list drop-down__is--active"
        >
          {options.map(option => (
            <li key={option.label}>
              <Link
                className="drop-down-item"
                to={{
                  search: getSearchWith(
                    searchParams, { [searchName]: option.value },
                  ),
                }}
                onClick={() => handleSelectOption(option.value)}
              >
                {option.value}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
