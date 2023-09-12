/* eslint-disable max-len */

import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import '../../styles/Nav.scss';
import { useEffect } from 'react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M2.93333 15.0966V7.25442H0V17.7306H6.65986V15.0966H2.93333Z" fill="#313237" />
            <path d="M11.6842 18C15.0516 18 17.4461 15.7102 17.4461 12.5075C17.4461 9.2898 15.0516 7 11.6842 7C8.31688 7 5.92232 9.30476 5.92232 12.5075C5.92232 15.6952 8.31688 18 11.6842 18ZM11.6842 15.3211C10.0978 15.3211 8.91552 14.1238 8.91552 12.5075C8.91552 10.8762 10.0978 9.67891 11.6842 9.67891C13.2856 9.67891 14.438 10.8612 14.438 12.5075C14.438 14.1388 13.2856 15.3211 11.6842 15.3211Z" fill="#313237" />
            <path d="M22.535 12.1333V13.9592H25.1391C24.8099 14.7673 23.867 15.3061 22.7595 15.3061C21.1731 15.3061 20.1405 14.1687 20.1405 12.5075C20.1405 10.8313 21.1881 9.69388 22.7595 9.69388C23.8221 9.69388 24.765 10.2626 25.1391 11.1456H28.1772C27.7282 8.72109 25.4833 7 22.7296 7C19.5119 7 17.1772 9.31973 17.1772 12.5075C17.1772 15.6952 19.5568 18 22.7595 18C26.0371 18 28.282 15.5605 28.282 12.1333H22.535Z" fill="#313237" />
            <path d="M33.7555 18C37.1229 18 39.5175 15.7102 39.5175 12.5075C39.5175 9.2898 37.1229 7 33.7555 7C30.3882 7 27.9936 9.30476 27.9936 12.5075C27.9936 15.6952 30.3882 18 33.7555 18ZM33.7555 15.3211C32.1692 15.3211 30.9868 14.1238 30.9868 12.5075C30.9868 10.8762 32.1692 9.67891 33.7555 9.67891C35.3569 9.67891 36.5093 10.8612 36.5093 12.5075C36.5093 14.1388 35.3569 15.3211 33.7555 15.3211Z" fill="#313237" />
          </svg>
        </Link>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav-link">
              <NavLink
                to="/"
                className="nav-item"
              >
                Github
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/phones"
                className="nav-item"
              >
                Contacts
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/phones"
                className="nav-item"
              >
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>

        <section className="footer__rightSide">
          <span className="footer__rightSide-title">
            Back to top
          </span>
          <button
            type="button"
            className="footer__button"
            onClick={scrollToTop}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876 9.52855L7.52876 5.52856C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891 12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714L8.00016 6.94277L4.47157 10.4714C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z" fill="#B4BDC4" />
            </svg>
          </button>
        </section>
      </div>
    </footer>
  );
};
