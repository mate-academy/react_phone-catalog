import React from 'react';
import { Link } from 'react-router-dom';
import { BackToTop } from '../BackToTop';
import { ReactComponent as Logo } from '../../icons/Logo.svg';

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
              href="https://github.com/DragotaIV?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>

          <BackToTop />
        </div>
      </div>
    </div>
  );
};
