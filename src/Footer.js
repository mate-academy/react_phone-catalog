import React from 'react';
import { Link } from 'react-router-dom';

import './slyles/footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footerMenu">
      |
      <Link className="footerMenuLink" to="/">&nbsp;&nbsp;HOME&nbsp;&nbsp;</Link>
      |
      <Link className="footerMenuLink" to="/phones">&nbsp;&nbsp;PHONES LIST&nbsp;&nbsp;</Link>
      |
      <Link className="footerMenuLink" to="/cart">&nbsp;&nbsp;CART&nbsp;&nbsp;</Link>
      |
    </div>
    <Link to="/" className="footerLogo">&#128241;&nbsp;&nbsp;P H O N E S</Link>
    <div className="developer">
      <p>developed by</p>
      <h6>RAVEN</h6>
    </div>
    <div className="end" />
  </footer>
);

export default Footer;
