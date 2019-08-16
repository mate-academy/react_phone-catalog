import React from 'react';
import PropTypes from 'prop-types';

const SelectPhonesAmount = ({ changePerPageAmount }) => (
  <label
    htmlFor="posts-amount"
    className="selector"
  >
    Phones Amount:
    <select
      id="posts-amount"
      onChange={changePerPageAmount}
      className="selector__phones-amount"
      defaultValue={8}
    >
      <option value={8}>8</option>
      <option value={12}>12</option>
      <option value={16}>16</option>
      <option value={20}>20</option>
    </select>
  </label>
);

SelectPhonesAmount.propTypes = {
  changePerPageAmount: PropTypes.func.isRequired,
};

export default SelectPhonesAmount;
