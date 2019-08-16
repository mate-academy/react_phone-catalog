import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Sorter = ({ getSortedPhones, sortField }) => (
  <div className="sorter">
    <span className="sorter__label">Sort by:</span>
    <ul className="sorter__items">
      <li
        className={classnames('sorter__item', {
          'sorter__item-active': sortField === 'age',
        })}
        onClick={() => getSortedPhones('age')}
      >
        Newest
      </li>
      <li
        className={classnames('sorter__item', {
          'sorter__item-active': sortField === 'alphabet',
        })}
        onClick={() => getSortedPhones('alphabet')}
      >
        Alphabetical
      </li>
    </ul>
  </div>
);

Sorter.propTypes = {
  getSortedPhones: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
};

export default Sorter;
