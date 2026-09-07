import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { SortByName } from '../../../types/SortByName';
import { SortByCount } from '../../../types/SortByCount';

type Props = {
  sortName: string;
  sortCount: string;
  searchParams: URLSearchParams;
  setSearchParams: (el: URLSearchParams) => void;
  sortByNameMenuRef: React.RefObject<HTMLDivElement>;
  sortByCountMenuRef: React.RefObject<HTMLDivElement>;
};

export const SortBlock: React.FC<Props> = ({
  sortName,
  sortCount,
  searchParams,
  setSearchParams,
  sortByNameMenuRef,
  sortByCountMenuRef,
}) => {
  const [sortByNameIsActive, setSortByNameIsActive] = useState(false);
  const [sortByCountIsActive, setSortByCountIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortByNameMenuRef.current &&
        !sortByNameMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          '.sort-block__select-container--sort-by',
        )
      ) {
        setSortByNameIsActive(false);
      }

      // Закрываем меню количества, если клик вне его области
      if (
        sortByCountMenuRef.current &&
        !sortByCountMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          '.sort-block__select-container--counts',
        )
      ) {
        setSortByCountIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSortByNameMenu = useCallback(() => {
    setSortByNameIsActive(prev => !prev);
    setSortByCountIsActive(false);
  }, [sortByNameIsActive]);

  const toggleSortByCountMenu = () => {
    setSortByCountIsActive(prev => !prev); // Инвертирует текущее состояние
    setSortByNameIsActive(false); // Закрывает другое меню
  };

  const handleClickkOptionName = (sortBy: SortByName) => {
    const params = new URLSearchParams(searchParams);

    params.set('sortName', sortBy);

    setSearchParams(params);
  };

  const handleClickkOptionCount = (sortBy: SortByCount) => {
    const params = new URLSearchParams(searchParams);

    const mappedValue = sortBy === SortByCount.all ? 'All' : String(sortBy);

    params.set('sortCount', mappedValue);
    params.set('currentPage', ``);

    setSearchParams(params);
  };

  return (
    <div className="sort-block__blocks">
      {/* Сортировка по имени */}
      <div
        // eslint-disable-next-line max-len
        className="sort-block__select-container sort-block__select-container--sort-by"
      >
        <label htmlFor="sortName" className="sort-block__label">
          Sort by
        </label>
        <div className="sort-block__select" onClick={toggleSortByNameMenu}>
          <div
            className={cn('sort-block__select__main', {
              'sort-block__select__main--is-active': sortByNameIsActive,
            })}
          >
            <div className="sort-block__option--is-active">{sortName}</div>
            <div
              className={cn('icon', {
                'icon--array--down--grey': !sortByNameIsActive,
                'icon--array--up--grey': sortByNameIsActive,
              })}
            ></div>
          </div>

          {sortByNameIsActive && (
            <div
              ref={sortByNameMenuRef}
              className="sort-block__options-container"
            >
              <div className="sort-block__options-content">
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionName(SortByName.newest)}
                >
                  {SortByName.newest}
                </div>
                <div
                  className="sort-block__option"
                  onClick={() =>
                    handleClickkOptionName(SortByName.alphabetically)
                  }
                >
                  {SortByName.alphabetically}
                </div>
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionName(SortByName.cheapest)}
                >
                  {SortByName.cheapest}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Количество элементов на странице */}
      <div
        className="
          sort-block__select-container sort-block__select-container--counts
        "
      >
        <label htmlFor="sortCount" className="sort-block__label">
          Items on page
        </label>
        <div className="sort-block__select" onClick={toggleSortByCountMenu}>
          <div
            className={cn('sort-block__select__main', {
              'sort-block__select__main--is-active': sortByCountIsActive,
            })}
          >
            <div className="sort-block__option--is-active">{sortCount}</div>
            <div
              className={cn('icon', {
                'icon--array--down--grey': !sortByCountIsActive,
                'icon--array--up--grey': sortByCountIsActive,
              })}
            ></div>
          </div>

          {sortByCountIsActive && (
            <div
              className="sort-block__options-container"
              ref={sortByCountMenuRef}
            >
              <div className="sort-block__options-content">
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionCount(SortByCount.four)}
                >
                  {SortByCount.four}
                </div>
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionCount(SortByCount.eight)}
                >
                  {SortByCount.eight}
                </div>
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionCount(SortByCount.sixteen)}
                >
                  {SortByCount.sixteen}
                </div>
                <div
                  className="sort-block__option"
                  onClick={() => handleClickkOptionCount(SortByCount.all)}
                >
                  {SortByCount.all}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
