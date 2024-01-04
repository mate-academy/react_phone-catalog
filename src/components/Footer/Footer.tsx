import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { NavBar } from '../NavBar/NavBar';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';

export const Footer: React.FC = () => {
  const footerLinks = ['github', 'contacts', 'rigthts'];

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Link className="footer__logo" to="/" />

          <div className="footer__navBar">
            <NavBar links={footerLinks} />
          </div>

          <div className="footer__toTop">
            <p className="footer__p">Back to top</p>

            <ButtonIcon
              type="event"
              shape="up"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
