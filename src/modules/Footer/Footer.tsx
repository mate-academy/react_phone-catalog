import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft } from '../shared/MoveButtons';
import { getLogo } from '../../services/getLogo';
import { SidebarContext } from '../../store/SidebarContext';

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

          <Link to="/" className="footer__nav-item navigation-title">
            Contacts
          </Link>

          <Link to="/" className="footer__nav-item navigation-title">
            Rights
          </Link>
        </div>

        <div className="footer__back-to-top">
          <p className="footer__back-to-top-title">Back to top</p>
          <div className="footer__back-to-top-button">
            <MoveLeft move={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
});
