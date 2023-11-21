import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { SortBy } from '../../types/SortedBy';
import { SelectorType } from '../../types/SelectorType';
import { IconType } from '../../types/Icon';
import './DownDrops.scss';

type Props = {
  type: SelectorType,
};

export const DownDrops: React.FC<Props> = ({ type }) => {
  const [selectedValue, setSelectedValue] = useState('All');
  const [isOpened, setIsOpened] = useState(false);

  const location = useLocation();
  const categoryType = location.pathname.slice(1);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortBy || null;
  const perPage = searchParams.get('perPage') || null;

  const title = (type === SelectorType.SORT__BY)
    ? 'Sort by'
    : 'Items on page';

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
    setIsOpened(false);
  };

  const handleToggleList = () => {
    setIsOpened(!isOpened);
  };

  const sortByList: Record<string, string | null> = {
    Newest: 'year',
    Alphabetically: 'name',
    Cheapest: 'fullPrice',
    All: null,
  };

  const itemsOnPageList: Record<string, string | null> = {
    4: '4',
    8: '8',
    16: '16',
    All: null,
  };

  const defaultSelectorValue = () => {
    if (!sort || !perPage) {
      setSelectedValue('All');
    }

    if (type === SelectorType.SORT__BY && sort) {
      const sortItems = Object.entries(sortByList)
        .find(([, value]) => value === sort);

      if (sortItems) {
        setSelectedValue(sortItems[0]);
      }
    }

    if (type === SelectorType.ITEMS__ONPAGE && perPage) {
      const perPageItems = Object.entries(itemsOnPageList)
        .find(([, value]) => value === perPage);

      if (perPageItems) {
        setSelectedValue(perPageItems[0]);
      }
    }
  };

  const selectorParams = (type === SelectorType.SORT__BY)
    ? sortByList
    : itemsOnPageList;

  const getRouteParams = (
    selectorType: string,
    value: string,
  ) => {
    const sortByParams = {
      sort: selectorParams[value],
      perPage: searchParams.get('perPage'),
      page: searchParams.get('page'),
    };

    const itemsOnPageParams = {
      sort: searchParams.get('sort'),
      perPage: selectorParams[value],
      page: value === 'All' ? null : '1',
    };

    return (selectorType === SelectorType.SORT__BY)
      ? sortByParams
      : itemsOnPageParams;
  };

  const valuesList = Object.keys(selectorParams);

  useEffect(() => {
    defaultSelectorValue();
  }, [categoryType]);

  return (
    <div
      className={classNames(
        'selector__sortBy',
        'selector__items-onPage',
      )}
      onMouseLeave={() => setIsOpened(false)}
    >
      <div className="selector__title">
        {title}
      </div>

      <div className="selector__group">
        <div className="filter">
          <button
            className="filter__button"
            type="button"
            onClick={handleToggleList}
          >
            <div className="filter__selectedValue">
              {selectedValue}
            </div>

            <div className="filter__arrow">
              {isOpened
                ? <Icon type={IconType.ARROW_UP_DISABLED} />
                : <Icon type={IconType.ARROW_DOWN_DISABLED} />}
            </div>
          </button>

          {isOpened && (
            <ul className="filter__container">
              {valuesList.map(value => (
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      getRouteParams(type, value),
                    ),
                  }}
                  key={value}
                  className="filter__value"
                  onClick={() => handleChangeValue(value)}
                >
                  {value}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
