import './Footer.scss';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GITHUB_URL } from '../../api/api';
import { BackToTopButton } from '../BackToTopButton';
import { NotImpementFeature } from '../NotImplementFeature';

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
    <footer className="footer">
      <div className="footer__container main__container">
        <Link to="/" className="footer__logo">
          <div className="footer__logo-image" />
        </Link>
        <div className="footer__content">
          <Link
            className="footer__content-link"
            to={GITHUB_URL}
            target="_blank"
          >
            Github
          </Link>
          <Link
            className="footer__content-link"
            to={pathname}
            onClick={handleLinkClick}
          >
            Contacts
          </Link>
          <Link
            className="footer__content-link"
            to={pathname}
            onClick={handleLinkClick}
          >
            Rights
          </Link>
        </div>

        <BackToTopButton />
      </div>

      {isModalOpen && <NotImpementFeature onClose={setIsModalOpen} />}
    </footer>
  );
};
