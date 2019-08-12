import React from 'react';
import PropTypes from 'prop-types';

const SelectPhonesAmmount = ({ changePerPageAmmount }) => (
  <label htmlFor="posts-ammount">
    Posts Ammount:
    <select
      id="posts-ammount"
      onChange={changePerPageAmmount}
      className="pagination__posts-ammount"
      defaultValue={5}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </label>
);

SelectPhonesAmmount.propTypes = {
  changePerPageAmmount: PropTypes.func.isRequired,
};

export default SelectPhonesAmmount;
