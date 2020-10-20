import React from 'react';
import './Footer.scss';

export const Footer = () => {

  return (
    <div className="section section_footer">
      <footer className="footer">
        <div className="logo footer__logo"></div>
        <nav className="nav footer__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="https://github.com/nanccyy" className="nav__link">Github</a>
            </li>
            <li className="nav__item">
              <a href="#contacts" className="nav__link">Contacts</a>
            </li>
            <li className="nav__item">
              <a href="#rights" className="nav__link">Rights</a>
            </li>
          </ul>
        </nav>
          <div 
          className="footer__scroll-back" 
          onClick={() => window.scrollTo(0, 0)} >
            <p>Back to top</p>
            <button 
            type="button" 
            className="footer__button"
            >
              <div className="footer__arrow"></div>
            </button>
          </div>
      </footer>
    </div>
  )
}