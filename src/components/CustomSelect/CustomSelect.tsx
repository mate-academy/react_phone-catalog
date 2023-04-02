import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './select.scss';

type Props = {
  type: string;
  width: number;
  options: string[];
  defaultValue: string | number;
  onSelect: () => void;
  search: string;
};

export const CustomSelect: React.FC<Props> = ({
  width,
  options,
  type,
  defaultValue,
  onSelect,
  search,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(defaultValue);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    return !searchParams.get(search)
      ? setCurrentOption(defaultValue)
      : setCurrentOption(search);
  }, [searchParams]);

  const onOptionSelect = (value: string) => {
    const sortParams = {
      Newest: 'age',
      Alphabetically: 'name',
      Cheapest: 'price',
    };

    if (Object.hasOwn(sortParams, value)) {
      searchParams.set('sort', sortParams[value as keyof typeof sortParams]);
      setSearchParams(searchParams);
    } else {
      searchParams.set('perPage', value);
    }

    setSearchParams(searchParams);
    setCurrentOption(value);
    onSelect();
    setIsOpen(false);
  };

  return (
    <div
      className={`select ${type}`}
      style={{ width: `${width}px` }}
    >
      <div
        aria-hidden="true"
        className="select__head"
        onClick={toggle}
        onKeyDown={toggle}
      >
        {currentOption}
        <span className="select__arrow">
          {isOpen ? (
            <img src="/img/icons/arrowUp.svg" alt="select" />
          ) : (
            <img src="/img/icons/arrowDown.svg" alt="select" />
          )}
        </span>
      </div>

      {isOpen && (
        <div
          className="select__holder"
          style={{ width: `${width}px` }}
          onMouseLeave={toggle}
        >
          <ul className="select__list">
            {options.map(option => (
              <li
                aria-hidden="true"
                key={option}
                className="select__item"
                onClick={() => onOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
