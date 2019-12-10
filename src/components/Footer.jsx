import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <a
      className="link link--footer"
      href="https://github.com/h2ash/react_phone-catalog/tree/develop_2"
    >GitHub Link</a>
    <Link to="/rights" className="link link--footer">Rights</Link>
  </footer>
)

export default Footer;