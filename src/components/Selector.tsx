import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SORT_PARAMS } from '../utils/sortParams';
import { ITEMS_PER_PAGE } from '../utils/itemsPerPageParams';
import { getSearchWith } from '../utils/getSearchWith';
import { SearchParams } from '../types/searchParams';

export const Selector = () => {
  const [openSelector, setOpenSelector] = useState<'sort' | 'items' | null>(
    null,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('items') || 'all';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);
    setSearchParams(search);
  };

  const handleSortByOption = (option: string) => {
    setOpenSelector(null);

    setSearchWith({ sort: option });
  };

  const handleItemsOnPageOption = (option: string) => {
    setOpenSelector(null);
    setSearchWith({ items: option });
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenSelector(null);

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="grids m-0 mb-[24px]">
      <div className="col-[1/3] flex flex-col gap-[4px] sm:col-[1/5]">
        <p className="params-text text-secondary">Sort by</p>

        <div className="relative w-full">
          <div
            onClick={e => {
              e.stopPropagation();
              setOpenSelector(openSelector === 'sort' ? null : 'sort');
            }}
            className="selector"
          >
            {(sortBy === 'age' && 'Newest') ||
              (sortBy === 'name' && 'Alphabettically') ||
              (sortBy === 'price' && 'Cheapest')}

            <img
              src="./img/icons/Arrow_Right.svg"
              alt="Arrow"
              className={`icons ${openSelector === 'sort' ? '-rotate-90' : 'rotate-90'}`}
            />
          </div>

          {openSelector === 'sort' && (
            <ul
              className="
                absolute
                mt-[4px]
                w-full
                rounded-[8px]
                border
                border-elements
                bg-white
              "
            >
              {SORT_PARAMS.map(sortParam => (
                <li
                  key={sortParam.name}
                  onClick={() => handleSortByOption(sortParam.sortBy)}
                  className="option"
                >
                  {sortParam.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="col-[3/5] flex flex-col gap-[4px] sm:col-[5/8]">
        <p className="params-text text-secondary">Items on page</p>

        <div className="relative w-full">
          <div
            onClick={e => {
              e.stopPropagation();
              setOpenSelector(openSelector === 'items' ? null : 'items');
            }}
            className="selector"
          >
            {itemsOnPage}

            <img
              src="./img/icons/Arrow_Right.svg"
              alt="Arrow"
              className={`icons ${openSelector === 'items' ? '-rotate-90' : 'rotate-90'}`}
            />
          </div>

          {openSelector === 'items' && (
            <ul
              className="
                absolute
                mt-[4px]
                w-full
                rounded-[8px]
                border
                border-elements
                bg-white
              "
            >
              {ITEMS_PER_PAGE.map(itemPerPage => (
                <li
                  key={itemPerPage.count}
                  onClick={() => handleItemsOnPageOption(itemPerPage.count)}
                  className="option"
                >
                  {itemPerPage.count}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
