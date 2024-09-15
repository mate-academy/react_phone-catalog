import React, { useState } from 'react';

export const Sorted = () => {
  const [newestList, setNewestList] = useState(false);
  const [allList, setAllList] = useState(false);

  function clickBy() {
    setNewestList(!newestList)
    setAllList(false);
  }

  function clickCount() {
    setAllList(!allList);
    setNewestList(false);
  }

  return (
    <div className="sort-list">
      <div className="sort-list__by">
        <p>Sort by</p>
        <div
          onClick={clickBy}
          className='sort-list__items-page--button'
        >
          Newest
        </div>

        {newestList && (
          <div className='sort-list--select'>
            <p className='sort-list--select-text'>Newest</p>
            <p className='sort-list--select-text'>Alphabetically</p>
            <p className='sort-list--select-text'>Cheapest</p>
          </div>
        )}
      </div>


      <div className="sort-list__items-page">
        <p>Items on page</p>
        <div
          onClick={clickCount}
          className='sort-list__items-page--button'
        >
          All
        </div>

        {allList && (
          <div className='sort-list--select'>
            <p className='sort-list--select-text'>4</p>
            <p className='sort-list--select-text'>8</p>
            <p className='sort-list--select-text'>16</p>
            <p className='sort-list--select-text'>All</p>
          </div>
        )}
      </div>
    </div>
  );
};
