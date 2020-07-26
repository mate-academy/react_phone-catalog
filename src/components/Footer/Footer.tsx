import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Debugger } from '../Debugger';
import './Footer.scss';

const footerNav = [
  {
    title: 'github',
    path: '/github',
  },
  {
    title: 'contacts',
    path: '/contacts',
  },
  {
    title: 'rights',
    path: '/rights',
  },
];

interface Props {
  handleMarker: any;
  statusOfMarker: boolean;
}

export const Footer = ({ handleMarker, statusOfMarker }: Props) => {
  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">
      <div className="footer__wrap">
        <Debugger handleMarker={handleMarker} statusOfMarker={statusOfMarker} />
        <div className="footer__logo logo">
          <img className="logo__img" src="./img/LOGO.svg" alt="company logo" />
        </div>
        <nav className="footer__navFooter navFooter ">
          <ul className="navFooter__list list">
            {footerNav.map((item) => (
              <li key={item.title} className="list__item">
                <NavLink className="list__link" to={item.path}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__lift lift">
          <p className="lift__title">Back to top</p>
          <button
            type="button"
            className="lift__button"
            onClick={backToTop}
          >
            <img className="lift__buttonImg" src="./img/Icons/arrows/top.svg" alt="up arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
};
