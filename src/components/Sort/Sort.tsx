import React from 'react';

const Sort = () => {
  return (
    <>
      <div className="Sort__container">
        <div className="Sort__item">
          <p className="Sort__title">Sort by</p>
          <select className="Sort__select">
            <option value="age" className="Sort__option">Newest</option>
            <option value="name" className="Sort__option">Alphabetically</option>
            <option value="price" className="Sort__option">Cheapest</option>
          </select>
        </div>
        <div className="Sort__item">
          <p className="Sort__title">Items on page</p>
          <select className="Sort__select">
            <option value="All" className="Sort__option">All</option>
            <option value="4" className="Sort__option">4</option>
            <option value="8" className="Sort__option">8</option>
            <option value="16" className="Sort__option">16</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Sort;
