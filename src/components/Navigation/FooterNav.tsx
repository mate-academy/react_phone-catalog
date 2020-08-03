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
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528575 5.47124C0.268226 5.21089 0.268226 4.78878 0.528575 4.52843L4.52858 0.528433C4.78892 0.268083 5.21103 0.268083 5.47138 0.528433L9.47138 4.52843C9.73173 4.78878 9.73173 5.21089 9.47138 5.47124C9.21103 5.73159 8.78893 5.73159 8.52858 5.47124L4.99998 1.94265L1.47138 5.47124C1.21103 5.73159 0.788925 5.73159 0.528575 5.47124Z"
                fill="#313237"
              />
            </svg>
          </button>
        </a>
      </nav>
    </>
  );
};
