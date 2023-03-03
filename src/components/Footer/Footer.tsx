/* eslint-disable import/no-cycle */
import { NavLink } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { Logo } from '../../common/Logo/Logo';
import { scrollUp } from '../../Routes';
import './Footer.scss';

export const Footer = () => {
  const navLinksList = ['github', 'contacts', 'rights'];

  return (
    <div className="footer">
      <Logo />
      <ul
        className="footer__navigation-list"
        id="footer__navigation-list"
      >
        {
          navLinksList.map((link) => {
            return (
              <li key={link} className="footer__navigation-item">
                {
                  link !== 'github'
                    ? (
                      <NavLink
                        className="footer__navigation-link"
                        to={link}
                      >
                        {link}
                      </NavLink>
                    )
                    : (
                      <a href="https://github.com/Alina-Yermolenko">
                        github
                      </a>
                    )
                }
              </li>
            );
          })
        }
      </ul>
      <div className="footer__top">
        <div
          onClick={scrollUp}
          className="footer__button-up"
          aria-hidden
        >
          <p className="footer__button-text body12">
            Back to top
          </p>
          <Button
            className="arrow up small"
            image="icons/Chevron (Arrow Up).svg"
            alt="arrow-top"
            imageClass="arrow-top__active"
          />
        </div>
      </div>
    </div>
  );
};
