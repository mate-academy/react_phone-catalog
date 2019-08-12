import React from 'react';
import PropTypes from 'prop-types';

const SelectPhonesAmmount = ({ changePerPageAmmount }) => (
  <label htmlFor="posts-ammount">
    Posts Ammount:
    <select
      id="posts-ammount"
      onChange={changePerPageAmmount}
      className="pagination__posts-ammount"
      defaultValue={8}
    >
      <option value={8}>8</option>
      <option value={12}>12</option>
      <option value={16}>16</option>
      <option value={20}>20</option>
    </select>
  </label>
);

SelectPhonesAmmount.propTypes = {
  changePerPageAmmount: PropTypes.func.isRequired,
};

export default SelectPhonesAmmount;
