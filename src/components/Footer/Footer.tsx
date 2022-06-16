import React from 'react';
import { Link } from 'react-router-dom';
import { BackToTop } from '../BackToTop';
import { ReactComponent as Logo } from '../../images/Logo.svg';

import './footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__block">
          <Link to="/">
            <Logo />
          </Link>

          <div className="footer__links">
            <a
              href="https://github.com/alexandr1223"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
            {/* <Link to="/">
              Contacts
            </Link>
            <Link to="/">
              Rights
            </Link> */}
          </div>

          <BackToTop />
        </div>
      </div>
    </div>
  );
};
