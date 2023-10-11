import { useEffect, useState } from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { SelectorType } from '../../types/SelectorType';
import { IconType } from '../../types/Icon';
import './Selector.scss';

type Props = {
  type: SelectorType,
};

export const Selector: React.FC<Props> = ({ type }) => {
  const [searchParams] = useSearchParams();

  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';

  const selectorTitle = (type === 'sort-by')
    ? 'Sort by'
    : 'Items on page';

  const selectorSortByList: Record<string, string | null> = {
    All: null,
    Alphabetically: 'name',
    Newest: 'age',
    Cheapest: 'price',
  };

  const selectorItemsOnPageList: Record<string, string | null> = {
    All: null,
    4: '4',
    8: '8',
    16: '16',
  };

  const getSelectorValue = () => {
    if (!sort.length || !perPage.length) {
      setSelectedValue('All');
    }

    if (type === 'sort-by' && sort.length > 0) {
      const sortOptions = Object.entries(selectorSortByList);
      const sortItem = sortOptions.filter(item => item[1] === sort)[0][0];

      setSelectedValue(sortItem);
    }

    if (type === 'items-on-page' && perPage.length > 0) {
      const onPageOptions = Object.entries(selectorItemsOnPageList);
      const onPageItem = onPageOptions.filter(
        item => item[1] === perPage,
      )[0][0];

      setSelectedValue(onPageItem);
    }
  };

  const selectorParams = (type === 'sort-by')
    ? selectorSortByList
    : selectorItemsOnPageList;

  const selectorList = (type === 'sort-by')
    ? Object.keys(selectorSortByList)
    : Object.keys(selectorItemsOnPageList);

  const getRouteParams = (
    selectorType: string,
    option: string,
  ) => {
    const sortByParams = {
      sort: selectorParams[option],
      perPage: searchParams.get('perPage'),
      page: searchParams.get('page'),
    };

    const itemsOnPageParams = {
      sort: searchParams.get('sort'),
      perPage: selectorParams[option],
      page: option === 'All' ? null : '1',
    };

    return (selectorType === 'sort-by')
      ? sortByParams
      : itemsOnPageParams;
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpened(false);
  };

  useEffect(() => {
    getSelectorValue();
  }, []);

  return (
    <div
      className={classNames(
        { 'filters__sort-filter': type === 'sort-by' },
        { 'filters__on-page-filter': type === 'items-on-page' },
      )}
      onMouseLeave={() => setIsOpened(false)}
    >
      <div className="filters__subtitle">
        {selectorTitle}
      </div>

      <div className="filters__filter">
        <div className="selector">
          <button
            className="selector__picker"
            type="button"
            onClick={() => setIsOpened(!isOpened)}
          >
            <div className="selector__picker--title">
              {selectedValue}
            </div>

            <div className="selector__picker--arrow">
              {!isOpened
                && (
                  <Icon
                    type={IconType.ARROW_DOWN}
                  />
                )}

              {isOpened
                && (
                  <Icon
                    type={IconType.ARROW_UP_DISABLED}
                  />
                )}
            </div>
          </button>

          <ul
            className={classNames(
              'selector__list',
              { 'selector__list--is-hidden': !isOpened },
            )}
          >
            {selectorList.map(option => (
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getRouteParams(type, option),
                  ),
                }}
                key={option}
                className="selector__item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
