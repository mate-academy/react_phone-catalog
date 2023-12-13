/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
};

const perPageOptions: PerPageType[] = ['4', '8', '16', 'all'];

export const Filtration: React.FC<Props> = ({ children, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [perPage, setPerPage] = useState<PerPageType>('16');
  const [currentPage, setCurrentPage] = useState(1);

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
      setSearchParams(searchParams);
    }
  }, [searchParams.get('sort')]);

  useEffect(() => {
    const perPageOption = searchParams.get('perPage') || '16';

    if (perPageOptions.includes(perPageOption as PerPageType)) {
      setPerPage(perPageOption as PerPageType);
    } else {
      setPerPage('16');
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
        searchParams.set('page', '1');
        setSearchParams(searchParams);
      }
    } catch {
      setCurrentPage(1);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams.get('page')]);

  return (
    <div className="Filtration">
      <div className="Filtration__filters">
        <div className="Filtration__filters-sort">
          <p className="Filtration__filters-description">Sort by</p>
          <div
            tabIndex={0}
            role="menu"
            className="dropdown"
            onFocus={() => setIsSortOpen(prev => !prev)}
            onBlur={() => setIsSortOpen(false)}
          >
            <p className="dropdown-text">
              {sort}
            </p>
            <img
              src="icons/arrow-down-grey.svg"
              alt="arr"
              className="dropdown-arrow"
            />
            <div className={cn('dropdown-content', { show: isSortOpen })}>
              {Object.entries(sortOptions).map(([key, option]) => (
                <Link
                  key={key}
                  to={{ search: getSearchString(searchParams, 'sort', option) }}
                  className={cn('dropdown-item', { active: sort === key })}
                  onClick={event => event.currentTarget.blur()}
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
            tabIndex={0}
            role="menu"
            className="dropdown Filtration__filters-items-dropdown"
            onFocus={() => setIsPerPageOpen(prev => !prev)}
            onBlur={() => setIsPerPageOpen(false)}
          >
            <p className="dropdown-text">
              {perPage}
            </p>
            <img
              src="icons/arrow-down-grey.svg"
              alt="arr"
              className="dropdown-arrow"
            />
            <div className={cn('dropdown-content', { show: isPerPageOpen })}>
              {perPageOptions.map(option => (
                <Link
                  key={option}
                  to={{
                    search: getSearchString(searchParams, 'perPage', option),
                  }}
                  className={cn('dropdown-item',
                    { active: perPage === option })}
                  onClick={event => event.currentTarget.blur()}
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
