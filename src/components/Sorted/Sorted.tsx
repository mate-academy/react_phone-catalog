import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Sorted = () => {
  const [newestList, setNewestList] = useState(false);
  const [allList, setAllList] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);

  function updateSearchParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  }

  function removeSearchParam(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  }

  function clickBy() {
    setNewestList(!newestList);
    setAllList(false);
  }

  function clickCount() {
    setAllList(!allList);
    setNewestList(false);
  }

  return (
    <div className="sort-list">
      {/* Сортировка */}
      <div className="sort-list__by">
        <p>Sort by</p>
        <div onClick={clickBy} className="sort-list__items-page--button">
          {searchParams.get('sort') || 'Newest'}
        </div>

        {newestList && (
          <div className="sort-list--select">
            <p
              onClick={() => {
                removeSearchParam('sort');
                setNewestList(false);
              }}
              className="sort-list--select-text"
            >
              Newest
            </p>
            <p
              onClick={() => {
                updateSearchParam('sort', 'Alphabetically');
                setNewestList(false);
              }}
              className="sort-list--select-text"
            >
              Alphabetically
            </p>
            <p
              onClick={() => {
                updateSearchParam('sort', 'Cheapest');
                setNewestList(false);
              }}
              className="sort-list--select-text"
            >
              Cheapest
            </p>
          </div>
        )}
      </div>

      {/* Элементы на странице */}
      <div className="sort-list__items-page">
        <p>Items on page</p>
        <div onClick={clickCount} className="sort-list__items-page--button">
          {searchParams.get('perPage') || 'All'}
        </div>

        {allList && (
          <div className="sort-list--select">
            <p
              onClick={() => {
                updateSearchParam('perPage', '4');
                setAllList(false);
              }}
              className="sort-list--select-text"
            >
              4
            </p>
            <p
              onClick={() => {
                updateSearchParam('perPage', '8');
                setAllList(false);
              }}
              className="sort-list--select-text"
            >
              8
            </p>
            <p
              onClick={() => {
                updateSearchParam('perPage', '16');
                setAllList(false);
              }}
              className="sort-list--select-text"
            >
              16
            </p>
            <p
              onClick={() => {
                removeSearchParam('perPage');
                setAllList(false);
              }}
              className="sort-list--select-text"
            >
              All
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
