import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './DropDown.scss';
import ArrowDown from '../../images/icons/arrow_down.svg';
import { getSearchWith } from '../../utils/searchHelper';
import { useWindowSize } from '../../hooks/useWindowSize';

export type SelectorType = 'sort-by' | 'items-on-page';
type Props = {
  type: SelectorType,
};

export const DropDown: React.FC<Props> = ({ type }) => {
  const [value, setValue] = useState('All');
  // const [itemsOnPage, setItemsOnPage] = useState<number | string>('All');
  // const [sortBy, setSortBy] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsOnPage = searchParams.get('perPage') || 'All';
  const sort = searchParams.get('sort') || 'All';

  const screenSize = useWindowSize();

  const selectOption = (option: string) => {
    if (option !== value) {
      setValue(option);
    }
  };

  const isOptionSelected = (option: string) => {
    return option === value;
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  ///
  const widthStyle = {
    width: '128px',
  };

  if (type === 'sort-by') {
    widthStyle.width = '176px';
  }

  if (screenSize.width >= 320 && screenSize.width <= 639) {
    widthStyle.width = '136px';
  }

  const dropDownTitle = (type === 'sort-by')
    ? 'Sort by'
    : 'Items on page';

  const sortByList: Record<string, string> = {
    All: '',
    Alphabet: 'name',
    Newest: 'age',
    Chepest: 'price',
  };

  const itemsOnPageList: Record<string, string> = {
    All: '',
    4: '4',
    8: '8',
    16: '16',
  };

  useEffect(() => {
    if (type === 'items-on-page') {
      const paramsToUpdate = {
        perPage: value,
        page: '1',
      };

      setSearchParams(getSearchWith(searchParams, paramsToUpdate));
    }

    if (type === 'sort-by') {
      const paramsToUpdate = {
        sort: value,
      };

      setSearchParams(getSearchWith(searchParams, paramsToUpdate));
    }
  }, [searchParams, setSearchParams, type, value]);

  const selectorList = (type === 'sort-by')
    ? Object.keys(sortByList)
    : Object.keys(itemsOnPageList);

  return (
    <div className="DropDown">
      <p className="DropDown__title">
        {dropDownTitle}
      </p>
      <div
        role="button"
        tabIndex={0}
        className="DropDown__container"
        style={widthStyle}
        onClick={() => setIsOpen(prev => !prev)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(prev => !prev)}
      >
        <span className="DropDown__value">
          {type === 'items-on-page' ? (
            itemsOnPage
          ) : (
            sort
          )}
        </span>
        <div>
          <img
            src={ArrowDown}
            alt="arrow down"
            className={classNames(
              'DropDown__caret',
              { 'DropDown__caret--up': isOpen },
            )}
          />
        </div>
        <ul className={classNames(
          'DropDown__options',
          { DropDown__options__show: isOpen },
        )}
        >
          {selectorList.map((option, index) => (
            <li
              key={option}
              className={classNames(
                'DropDown__option',
                {
                  DropDown__option__selected: isOptionSelected(option),
                  DropDown__option__highlighted:
                    index === highlightedIndex,
                },
              )}
            >
              <option
                // to={{
                //   search: getSearchWith(
                //     searchParams,
                //     getRouteParams(type, option),
                //   ),
                // }}
                onMouseEnter={() => setHighlightedIndex(index)}
                // onClick={() => {
                //   selectOption(option);
                //   // e.stopPropagation();
                //   // setIsOpen(false);
                //   // handleOptionClick(option);
                // }}
                onClick={() => selectOption(option)}
              >
                {option}

                {/* {type === 'items-on-page' && (itemsOnPage)} */}
              </option>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
