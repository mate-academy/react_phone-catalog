/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams, Link } from 'react-router-dom';
import {
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Pagination } from '../Pagination';
import './Filtration.scss';
import { getSearchString } from '../../helpers/getSearchString';

type Props = {
  total: number;
  children: React.ReactNode;
};

const sortOptions: { [key: string]: SortType } = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
  Expensive: '-price',
};

const perPageOptions: PerPageType[] = ['4', '8', '16', 'all'];

export const Filtration: React.FC<Props> = ({ children, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [perPage, setPerPage]
    = useState<PerPageType>(searchParams.get('perPage') as PerPageType || '16');
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);

  useEffect(() => {
    const sortOption = searchParams.get('sort');
    const sortTitle = Object
      .keys(sortOptions)
      .find(key => sortOptions[key] === sortOption);

    if (sortTitle) {
      setSort(sortTitle);
    } else {
      setSort('Newest');
      searchParams.set('sort', 'age');
      setSearchParams(new URLSearchParams(searchParams));
    }
  }, [searchParams.get('sort')]);

  useEffect(() => {
    const perPageOption = searchParams.get('perPage') || '16';

    if (perPageOptions.includes(perPageOption as PerPageType)) {
      setPerPage(perPageOption as PerPageType);
    } else {
      searchParams.set('perPage', '16');
      setSearchParams(searchParams);
    }
  }, [searchParams.get('perPage')]);

  useEffect(() => {
    const currentPageOption = searchParams.get('page') || '1';

    try {
      if (+currentPageOption >= 1
        && +currentPageOption <= Math.ceil(total / +perPage)) {
        setCurrentPage(+currentPageOption);
      } else {
        setCurrentPage(1);
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
    } catch {
      setCurrentPage(1);
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams.get('page')]);

  return (
    <div className="Filtration">
      <div className="Filtration__filters">
        <div className="Filtration__filters-sort">
          <p className="Filtration__filters-description">Sort by</p>
          <div
            className="dropdown"
            onBlur={() => setTimeout(() => setIsSortOpen(false), 100)}
          >
            <button
              type="button"
              className="dropdown-button"
              onClick={() => setIsSortOpen(prev => !prev)}
            >
              <p className="dropdown-text">
                {sort}
              </p>
              <img
                src="icons/arrow-down-grey.svg"
                alt="arr"
                className={cn('dropdown-arrow', { rotate: isSortOpen })}
              />
            </button>
            <div
              className={cn('dropdown-content', { show: isSortOpen })}
            >
              {Object.entries(sortOptions).map(([key, option]) => (
                <Link
                  key={key}
                  to={{
                    search: getSearchString(
                      searchParams,
                      { sort: option, page: null },
                    ),
                  }}
                  className={cn('dropdown-item', { active: sort === key })}
                >
                  {key}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="Filtration__filters-items">
          <p className="Filtration__filters-description">Items on page</p>
          <div
            className="dropdown"
            onBlur={() => setTimeout(() => setIsPerPageOpen(false), 100)}
          >
            <button
              type="button"
              className="dropdown-button
                Filtration__filters-items-dropdown-button"
              onClick={() => setIsPerPageOpen(prev => !prev)}
            >
              <p className="dropdown-text">
                {perPage}
              </p>
              <img
                src="icons/arrow-down-grey.svg"
                alt="arr"
                className={cn('dropdown-arrow', { rotate: isPerPageOpen })}
              />
            </button>
            <div className={cn('dropdown-content', { show: isPerPageOpen })}>
              {perPageOptions.map(option => (
                <Link
                  key={option}
                  to={{
                    search: getSearchString(
                      searchParams,
                      { perPage: option, page: null },
                    ),
                  }}
                  className={cn('dropdown-item',
                    { active: perPage === option })}
                >
                  {option}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
      {perPage !== 'all' && (
        <Pagination
          total={total}
          perPage={+perPage}
          currentPage={+currentPage}
        />
      )}
    </div>
  );
};
