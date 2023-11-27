import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './select.scss';
import { useToggle } from '../../hooks/useToggle';
import { SelectList } from '../SelectList';

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
  const [isOpen, setIsOpen, toggle] = useToggle();
  const [currentOption, setCurrentOption] = useState(defaultValue);
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    if (!searchParams.get(search)) {
      setCurrentOption(defaultValue);
    }
  }, [searchParams]);

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
            <img src="./img/icons/arrowUp.svg" alt="select" />
          ) : (
            <img src="./img/icons/arrowDown.svg" alt="select" />
          )}
        </span>
      </div>

      {isOpen && (
        <div
          className="select__holder"
          style={{ width: `${width}px` }}
          onMouseLeave={toggle}
        >
          <SelectList options={options} onSelect={onOptionSelect} />
        </div>
      )}
    </div>
  );
};
