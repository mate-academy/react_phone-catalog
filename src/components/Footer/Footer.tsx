import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = React.memo(
  () => {
    return (
      <footer className="footer App__footer">
        <div className="container">
          <div className="footer__nav">
            <div className="logo-box footer__logo-box">
              <Link to="/" className="logo footer__logo" />
            </div>

            <div className="nav-item footer__nav-item">
              <a
                href="https://github.com/IvanShulhan"
                className="link nav-item__link"
              >
                github
              </a>
            </div>

            <div className="nav-item footer__nav-item">
              <button
                type="button"
                className="link footer__link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <p
                  className="nav-item__link-text"
                >
                  Back to top
                </p>

                <span
                  className="icon-box nav-item__icon-box"
                  id="back-to-top"
                >
                  <span className="icon nav-item__icon" />
                </span>
              </button>

            </div>
          </div>
        </div>
      </footer>
    );
  },
);
