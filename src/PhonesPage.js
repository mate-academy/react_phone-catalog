import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ tabs, tabId }) => (
  <div
    className="container"
  >
    <h1>Phones</h1>
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.isRequired,
  tabId: PropTypes.string.isRequired,
};

export default Tabs;
