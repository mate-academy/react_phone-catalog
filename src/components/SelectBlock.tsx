/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { SortBy } from '../utils/types/SortBy';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';

export const SelectBlock = () => {
  const { itemsOnPage } = useDiviceSize();
  const blurLeftRef = useRef<HTMLDivElement>(null);
  const blurRightRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLeftSelect, setShowLeftSelect] = useState(false);
  const [showRightSelect, setShowRightSelect] = useState(false);

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  const handleShowSelect = (item: string, searchItem: string) => {
    searchParams.set(searchItem, item);
    if (searchItem === 'perPage') {
      searchParams.delete('page');
    }

    setSearchParams(searchParams);
    setShowLeftSelect(false);
    setShowRightSelect(false);
  };

  window.addEventListener('click', (e) => {
    if (e.target instanceof Node
      && !blurRightRef.current?.contains(e.target)) {
      setShowRightSelect(false);
    }

    if (e.target instanceof Node && !blurLeftRef.current?.contains(e.target)) {
      setShowLeftSelect(false);
    }
  });

  useEffect(() => setSearchParams(''), [itemsOnPage]);

  return (
    <div className="filter">
      <div
        className="filter__wrap"
        ref={blurLeftRef}
      >
        <div className="filter__description">Sort by</div>
        <div
          className="filter__select filter__select--left"
          onClick={() => setShowLeftSelect(!showLeftSelect)}
        >
          <span>
            {sort?.replace(sort[0], sort[0].toLocaleUpperCase())
            || SortBy.Newest}
          </span>
          <img
            className={`${showLeftSelect && 'filter__arrow--up'}`}
            src="assests/images/Arrow-select.svg"
            alt="select-icon"
          />
        </div>
        {showLeftSelect && (
          <ul
            className="filter__options"
          >
            {Object.values(SortBy).map(item => (
              <li
                key={item}
                onClick={() => handleShowSelect(
                  item.toLocaleLowerCase(), 'sort',
                )}
                className={classnames('filter__item', {
                  'is-active': sort === item,
                })}
              >
                {item}

              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter__wrap" ref={blurRightRef}>
        <div
          className="filter__description"
        >
          Items on page

        </div>
        <div
          className="filter__select filter__select--right"
          onClick={() => setShowRightSelect(!showRightSelect)}
        >
          <span>
            {perPage || itemsOnPage[0]}
          </span>
          <img
            className={`${showRightSelect && 'filter__arrow--up'}`}
            src="assests/images/Arrow-select.svg"
            alt=""
          />
        </div>
        {showRightSelect && (
          <ul className="filter__options">
            {itemsOnPage.map(item => (
              <li
                key={item}
                onClick={() => handleShowSelect(item, 'perPage')}
                className={classnames('filter__item', {
                  'is-active': perPage === item,
                })}
              >
                {item}

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
