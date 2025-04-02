import './Footer.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('footer-item', { 'has-background-grey-lighter': isActive });

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="footer-container ">
        <div className="footer-left">
          <NavLink to="/" className="footer-logo" onClick={scrollToTop}>
            Nice👌
            <br />
            Gadgets
          </NavLink>

          <NavLink to="https://github.com/Stepan31" className={getLinkClass}>
            GITHUB
          </NavLink>

          <NavLink to="https://github.com/Stepan31" className={getLinkClass}>
            CONTACTS
          </NavLink>

          <NavLink to="https://github.com/Stepan31" className={getLinkClass}>
            RIGHTS
          </NavLink>
        </div>

        <div className="footer-right">
          <button className="footer-button" onClick={scrollToTop}>
            Back to top ^
          </button>
        </div>
      </div>
    </div>
  );
};
