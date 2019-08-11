import React from 'react';
import PropTypes from 'prop-types';

const SelectPhonesAmmount = ({ changePerPageAmmount }) => (
  <select
    onChange={changePerPageAmmount}
    className="pagination__posts-ammount"
  >
    <option value={0}>Posts Ammount</option>
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={20}>20</option>
  </select>
);

SelectPhonesAmmount.propTypes = {
  changePerPageAmmount: PropTypes.func.isRequired,
};

export default SelectPhonesAmmount;
