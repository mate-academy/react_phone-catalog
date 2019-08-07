import React from 'react';

const Filter = ({filterPhone, sortPhone}) => (
  <div className = "search_section">
  <form className="search-form">
    <div>
    <label>
      Search:
      <input
        onChange={filterPhone}
        class="form-control search-phone"
        type="text"
      />
    </label>
    </div>

    <label> Sort by:
      <select
        onChange={sortPhone}
        class="form-control sort-phone"
      >
        <option value="newest" selected>Newest</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </label>
  </form>
  </div>
);

export default Filter;
