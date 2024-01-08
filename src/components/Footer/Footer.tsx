import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { NavBar } from '../NavBar/NavBar';
import { ButtonEvent } from '../../elements/Buttons/ButtonEvent/ButtonEvent';

export const Footer: React.FC = () => {
  const footerLinks = ['rights', 'contacts', 'returns & refunds'];

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Link className="footer__logo" to="/" />

          <div className="footer__navBar">
            <NavBar links={footerLinks} small />
          </div>

          <div className="footer__toTop">
            <p className="footer__p">Back to top</p>

            <ButtonEvent
              shape="up"
              onClick={goTop}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
