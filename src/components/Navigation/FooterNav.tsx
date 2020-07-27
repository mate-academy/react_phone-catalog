import React from 'react';
import { NavLink } from 'react-router-dom';

export const FooterNav: React.FC = () => {
  return (
    <>
      <nav className="footer-nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="fontMonte nav__link" to="/" exact>
              <img src="img/images/logo-nav.png" alt="logo" />
            </NavLink>
          </li>
          <li className="nav__item"><a className="fontMonte nav__link" href="https://github.com/liliya-dev">Github</a></li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/contacts/">Contacts</NavLink></li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/rights/">Rights</NavLink></li>
        </ul>
        <a className="nav__link footer-nav__link" href="#home">
          Back to top &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            className="carousel__button carousel__button--back"
          >
            &nbsp;^&nbsp;
          </button>
        </a>
      </nav>
    </>
  );
};
