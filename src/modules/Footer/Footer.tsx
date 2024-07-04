/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoveButton as MoveUp } from '../shared/Buttons/MoveButtons';
import { getLogo } from '../../services/getLogo';
import { SidebarContext } from '../../store/SidebarContext';
import { scrollToTop } from '../../services/scrollToTop';

export const Footer = React.memo(() => {
  const { isOpenSidebar } = useContext(SidebarContext);
  const { logo } = getLogo();

  return (
    <div className="footer" style={isOpenSidebar ? { display: 'none' } : {}}>
      <div className="footer__container">
        <Link to="/" className="footer__logo-link">
          <img src={logo} alt="logo" className="footer__logo" />
        </Link>

        <div className="footer__nav">
          <Link
            to="https://github.com/IShamkii/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-item navigation-title"
          >
            Github
          </Link>

          <Link
            to="https://www.linkedin.com/in/%D1%96%D0%B2%D0%B0%D0%BD-%D1%88%D0%B0%D0%BC%D0%BA%D1%96%D0%B9-027734145/"
            target="_blank"
            className="footer__nav-item navigation-title"
          >
            Contacts
          </Link>

          <Link
            to="https://github.com/IShamkii"
            target="_blank"
            className="footer__nav-item navigation-title"
          >
            Rights
          </Link>
        </div>

        <div className="footer__back-to-top">
          <p className="footer__back-to-top-title">Back to top</p>
          <div className="footer__back-to-top-button">
            <MoveUp onMove={() => scrollToTop(true)} />
          </div>
        </div>
      </div>
    </div>
  );
});
