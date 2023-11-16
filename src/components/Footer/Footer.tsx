import React from 'react';
import logo from '../../images/logo.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__nav">
        <a className="top-bar__links" href="/">
          <img className="logo" src={logo} alt="Logo" />
        </a>
        <ul>
          <li>
            <a href="/">Github</a>
          </li>
          <li>
            <a href="/">Contacts</a>
          </li>
          <li>
            <a href="/">Rights</a>
          </li>
        </ul>
        <div>
          <p>Back to top</p>
          <a href="/">
            <img className="logo" src={logo} alt="Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};
