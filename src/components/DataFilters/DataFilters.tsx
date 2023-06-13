import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Phones } from '../../types/Phones';
import './dataFilters.scss';
import ArrowDown from '../../images/icons/arrow_down.svg';
import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';
import { SearchContext } from '../../App';

type Props = {
  dataPhones: Phones[],
  setFiltredPhones: (filtredPhones: Phones[]) => void
};

type SelectOption = {
  label: string,
  value: string,
};

export const DataFilters: React.FC<Props> = ({ dataPhones, setFiltredPhones }) => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'price', label: 'Price' },
  ];

  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [typeOfFilter, setTypeOfFilter] = useState(FilterType.All);

  const searchContext = useContext(SearchContext);

  const selectOption = (option: SelectOption) => {
    if (option !== value) {
      setValue(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return option === value;
  };

  const queryToLowerCase = searchContext?.searchValue.toLocaleLowerCase();

  const getFiltredPhones = useMemo(() => {
    const toFilter = dataPhones.filter(item => {
      const filterInput = item.name.toLowerCase().includes(queryToLowerCase);

      switch (typeOfFilter) {
        case FilterType.Age:
          return dataPhones.sort((a, b) => b.year - a.year) && filterInput;
        case FilterType.Name:
          return dataPhones.sort((a, b) => a.name.localeCompare(b.name)) && filterInput;
        case FilterType.Price:
          return dataPhones.sort((a, b) => b.fullPrice - a.fullPrice) && filterInput;
        default:
          return item;
      }
    });

    return toFilter;
  }, [typeOfFilter, dataPhones]);

  const filterHendler = (value: string) => {
    switch (value) {
      case 'name':
        return setTypeOfFilter(FilterType.Name);
      case 'age':
        return setTypeOfFilter(FilterType.Age);
      case 'price':
        return setTypeOfFilter(FilterType.Price);
      case 'all':
        return setTypeOfFilter(FilterType.All);
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setFiltredPhones(getFiltredPhones);
  }, [getFiltredPhones]);

  return (
    <div className="dataFilters">
      <p className="dataFilters__title">
        Sort by
      </p>
      <div
        tabIndex={0}
        className="dataFilters__container"
        onClick={() => setIsOpen(prev => !prev)}
        onBlur={() => setIsOpen(false)}
      >
        <span className="dataFilters__value">{value?.label}</span>
        <div>
          <img
            src={ArrowDown}
            alt="arrow down"
            className={classNames(
              'dataFilters__caret',
              { 'dataFilters__caret--up': isOpen },
            )}
          />
        </div>
        <ul className={classNames(
          'dataFilters__options',
          { dataFilters__options__show: isOpen },
        )}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={classNames(
                'dataFilters__option',
                { dataFilters__option__selected: isOptionSelected(option) },
                { dataFilters__option__highlighted: index === highlightedIndex },
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={e => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
                filterHendler(option.value);
              }}
            >
              {option.label}

            </li>
          ))}
        </ul>
      </div>

    </div>

  );
};
