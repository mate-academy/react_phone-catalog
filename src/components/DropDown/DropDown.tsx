import './DropDown.scss';
import classNames from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Option } from '../../types/SortTypes';
import { getSearchWith } from '../../helpers/searchHelper';
import arrowDown from '../../Images/Icons/ArrowDown.svg';
import arrowUp from '../../Images/Icons/ArrowUp.svg';

type Props = {
  options: Option[];
  label: string;
  initialValue: string;
  searchName: string;
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDroopDown = () => {
    setIsOpen(!isOpen);
    searchParams.set('page', '1');
  };

  const handleBodyClick = (event: MouseEvent) => {
    // Проверяем, был ли клик вне элемента списка
    if (
      dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const valueParams = searchParams.get(searchName);

    if (valueParams && options.find((option) => option.value === valueParams)) {
      setSelectOption(valueParams);
    } else {
      setSelectOption(initialValue);
    }
    // Add a handler for the entire document

    document.body.addEventListener('mousedown', handleBodyClick);

    // Removing the handler when unmounting a component
    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, [searchName, initialValue, options, searchParams]);

  return (
    <div className="drop-down" ref={dropdownRef}>
      <label className="drop-down__title">{label}</label>
      <button
        className="drop-down__header"
        type="button"
        onClick={toggleDroopDown}
      >
        <span className="drop-down__current">{selectOption}</span>
        <div className="drop-down__icon">
          {isOpen ? (
            <img src={arrowUp} alt="arrow up" />
          ) : (
            <img src={arrowDown} alt="arrow down" />
          )}
        </div>
      </button>

      <ul
        className={classNames('drop-down__list', {
          'drop-down__is--deactivate': !isOpen,
        })}
      >
        {options.map((option) => (
          <li key={option.label}>
            <Link
              className="drop-down__item"
              to={{
                search: getSearchWith(searchParams, {
                  [searchName]: option.value,
                }),
              }}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
