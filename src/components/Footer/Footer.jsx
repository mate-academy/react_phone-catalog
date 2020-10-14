import React from 'react';

export const Footer = () => {
  return (
    <div className="section">
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
        <div className="footer__scroll-back">
          <p>Back to top</p>
          <button className="footer__slider slider slider_small">
            <div className="slider__arrow slider__arrow_top"></div>
          </button>
        </div>
      </footer>
    </div>
  )
}