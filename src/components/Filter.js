/*eslint-disable*/
import React from 'react';

const Filter = ({ injectFilteredPhones, initialPhones }) => {
  const filterPhones = (event) => {
    const { value } = event.target;
    const filteredPhones = [...initialPhones]
      .filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    injectFilteredPhones(filteredPhones);
  };
  
  const selectFilter = (event) => {
    const { value } = event.target;
    let filteredPhones = [];
    switch (value) {
      case 'alphabet':
        filteredPhones = [...initialPhones]
          .sort((a, b) => a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? 1 : -1);
        break;
      case 'begin':
        filteredPhones = [...initialPhones]
    }
    injectFilteredPhones(filteredPhones);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-search">
        <p className="sidebar-search__head">Search Phone</p>
        <input
          onChange={filterPhones}
          className="sidebar-search__input"
          placeholder="Phone name"
        />
        <select
          className="sidebar-search__select"
          onChange={selectFilter}>
          <option value='begin'>From begining</option>
          <option value='alphabet'>Alphabetical</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
