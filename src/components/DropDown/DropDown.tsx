import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './DropDown.scss';
import ArrowDown from '../../images/icons/arrow_down.svg';
import { getSearchWith } from '../../utils/searchHelper';

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

  const selectOption = (option: string) => {
    if (option !== value) {
      setValue(option);
    }

    // if (type === 'items-on-page') {
    //   setItemsOnPage(option);
    // }

    // if (type === 'sort-by') {
    //   setSortBy(option);
    // }
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

  // const sort = searchParams.get('sort') || '';
  // const perPage = searchParams.get('perPage');

  const getSelectedValue = () => {
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
  };

  useEffect(() => {
    getSelectedValue();
  }, [value]);

  // const getSelectedValue = () => {
  //   if (!sort.length || !perPage.length) {
  //     setValue('All');
  //   }

  //   if (type === 'sort-by' && sort.length > 0) {
  //     const sortOption = Object.entries(sortByList);
  //     const sortItem = sortOption.filter(item => item[1] === sort)[0][0];

  //     setValue(sortItem);
  //   }

  //   if (type === 'items-on-page' && perPage.length > 0) {
  //     const onPageOption = Object.entries(itemsOnPageList);
  //     const onPageItem = onPageOption.filter(item => item[1] === perPage)[0][0];

  //     setValue(onPageItem);
  //   }
  // };

  // const selectorParams = (type === 'sort-by')
  //   ? sortByList
  //   : itemsOnPageList;

  const selectorList = (type === 'sort-by')
    ? Object.keys(sortByList)
    : Object.keys(itemsOnPageList);

  // const getRouteParams = (
  //   selectorType: string,
  //   option: string,
  // ) => {
  //   const sortByParams = {
  //     sort: selectorParams[option],
  //     perPage: searchParams.get('perPage'),
  //     page: searchParams.get('page'),
  //   };

  //   const itemsOnPageParams = {
  //     sort: searchParams.get('sort'),
  //     perPage: selectorParams[option],
  //     page: option === 'All' ? null : '1',
  //   };

  //   return (selectorType === 'sort-by')
  //     ? sortByParams
  //     : itemsOnPageParams;
  // };

  // const handleOptionClick = (option: string) => {
  //   setValue(option);
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   getSelectedValue();
  // }, []);

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
