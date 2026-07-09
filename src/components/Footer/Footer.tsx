import { FC } from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

// 1. Імпортуємо логотип так само, як у хедері
import logo from '../../../Logo.png';

export const Footer: FC = () => {
  // База потрібна нам для іконки стрілочки "Back to top", бо вона лежить у public
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <a href="#">
            {/* 2. Замінюємо шлях на змінну logo */}
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="footer__items">
          <a
            className="footer__items__item"
            href="https://github.com/VasyaRusnak/react_phone-catalog.git"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <NavLink to="/contacts" className="footer__items__item">
            Contacts
          </NavLink>
          <NavLink
            to="/"
            className="footer__items__item"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Right
          </NavLink>
        </div>
        <div className="footer__back">
          <a className="footer__back__text" href="#">
            Back to top
            {/* Іконка стрілочки залишається через baseUrl, бо вона лежить в public/img/... */}
            <img
              src={`${baseUrl}/img/icons/Slider button - Default (right).png`}
              alt="back icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
