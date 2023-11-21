import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import './Footer.scss';

import { ScrollToTop } from '../ScrollToTop';
import { ComingSoon } from '../CommingSoon';
import { GITHUB_URL } from '../../helpers/constants';

export const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();

  const handleLinkClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);
  };

  return (
    <footer className="Footer">
      <div className="Footer__container main-content__container">
        <Link to="/" className="Footer__logo">
          <div className="Footer__logo-image" />
        </Link>

        <div className="Footer__content">
          <Link
            className="Footer__content-link"
            to={GITHUB_URL}
            target="_blank"
          >
            Github
          </Link>

          <Link
            className="Footer__content-link"
            to={pathname}
            onClick={handleLinkClick}
          >
            Contacts
          </Link>

          <Link
            className="Footer__content-link"
            to={pathname}
            onClick={handleLinkClick}
          >
            Rights
          </Link>
        </div>

        <ScrollToTop />
      </div>

      {isModalOpen && <ComingSoon onClose={setIsModalOpen} />}

    </footer>
  );
};
