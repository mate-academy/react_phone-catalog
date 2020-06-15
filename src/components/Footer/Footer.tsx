import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Footer.scss';

const Footer = () => {
  const footerItems = ['GITHUB', 'CONTACTS', 'RIGHTS'];

  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">

      <nav className="footer__nav">
        <Logo />
        <ul className="footer__list">
          {footerItems.map(item => (
            <li>
              <NavLink
                to={`${item}`}
                key={item}
                exact
                className="footer__item"
                activeClassName="footer__item__active"
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="footer__container">
          <p className="footer__backToTop">
            Back to top
          </p>
          <button
            type="button"
            aria-label="BackToTop"
            className="footer__button"
            onClick={backToTop}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.528575 5.47124C0.268226 5.21089 0.268226 4.78878 0.528575 4.52843L4.52858 0.528433C4.78892 0.268083 5.21103 0.268083 5.47138 0.528433L9.47138 4.52843C9.73173 4.78878 9.73173 5.21089 9.47138 5.47124C9.21103 5.73159 8.78893 5.73159 8.52858 5.47124L4.99998 1.94265L1.47138 5.47124C1.21103 5.73159 0.788925 5.73159 0.528575 5.47124Z" fill="#313237"/>
            </svg>
          </button>
        </div>


      </nav>

    </footer>
  );
};

export default Footer;
