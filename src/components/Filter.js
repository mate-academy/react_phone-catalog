/*eslint-disable*/
import React from 'react';

const Filter = ({ injectFilteredPhones, initialPhones }) => {
  const filterPhones = (event) => {
    const { value } = event.target;
    const filterePhones = [...initialPhones]
      .filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    injectFilteredPhones(filterePhones);
  };
  
  const selectFilter = (event) => {
    const { value } = event.target;
    let filterePhones = [];
    switch (value) {
      case 'alphabet':
        filterePhones = [...initialPhones]
          .sort((a, b) => a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? 1 : -1);
        break;
      case 'begin':
        filterePhones = [...initialPhones]
    }
    injectFilteredPhones(filterePhones);
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
