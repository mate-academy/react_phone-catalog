import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../Logo';

import './Footer.scss';

type Props = {
  linkTo: string;
};

const FooterLink: React.FC<Props> = ({ linkTo }) => (
  <Link
    to="https://github.com/Roman-Kulchytskyi"
    target="_blank"
    className="FooterLink"
  >
    {linkTo}
  </Link>
);

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__content">
          <div className="Footer__logo">
            <Logo />
          </div>

          <div className="Footer__links">
            <FooterLink linkTo="github" />
            <FooterLink linkTo="contacts" />
            <FooterLink linkTo="rights" />
          </div>

          <div className="Footer__top">
            <label className="Footer__top-label" htmlFor="footer__top-button">
              <span className="Footer__top-text">Back to top</span>

              <button
                type="button"
                id="footer__top-button"
                className="Footer__top-button"
              >
                {' '}
              </button>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};
