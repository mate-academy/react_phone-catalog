import React from 'react';
import PropTypes from 'prop-types';
import SpectrumGradient from '../spectrum-gradient';
import Background from '../background';
import Nav from '../nav';

import './styles.css';

const Layout = ({ children, totalBasketItems }) => (
  <div className="App">
    <div className="background">
      <SpectrumGradient />
    </div>
    <Background />
    <header>
      <Nav totalBasketItems={totalBasketItems} />
    </header>
    {children}
  </div>
);

Layout.propTypes = {
  totalBasketItems: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
