import React from 'react';
import logo from '../../images/logo.svg';
import arrowUp from '../../images/arrow-up.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__nav">
          <a href="/">
            <img className="logo" src={logo} alt="Logo" />
          </a>
          <ul className="list">
            <li className="list__item">
              <a
                className="list__link"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/vitalii-fedusov?tab=repositories"
              >
                Github
              </a>
            </li>
            <li className="list__item">
              <a className="list__link" href="/">Contacts</a>
            </li>
            <li className="list__item">
              <a className="list__link" href="/">Rights</a>
            </li>
          </ul>
          <div className="footer__button-up">
            <p className="footer__paragraph">Back to top</p>
            <button
              type="button"
              className="footer__link"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
            >
              <img className="footer__arrow-up" src={arrowUp} alt="Arrow up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
