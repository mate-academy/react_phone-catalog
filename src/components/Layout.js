import React from 'react';
import { SpectrumGradient } from './SpectrumGradient';
import Background from './Background';
import Nav from './Nav';

// eslint-disable-next-line react/prop-types
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

export default Layout;
