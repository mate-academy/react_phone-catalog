import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__container">

        <NavLink title="logo" to="home">
          <span className="header__logo" />
        </NavLink>

        <nav className="nav">
          <ul className="nav__list">
            <li>
              <a
                href="https://github.com/VitalyPasechnik/react_phone-catalog"
                className="nav__link"
              >
                github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vitaly-pasechnik-104bb6221/"
                className="nav__link"
              >
                contacts
              </a>
            </li>
            <li>
              <a
                href="#tablets"
                className="nav__link"
              >
                rights
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__actions">
          <p>
            Back to top
          </p>
          <a title="top" className="footer__button" href="#header">
            <span className="footer__top" />
          </a>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';

// export const footer: React.FC = () => {
//   return (
//     <>

//     </>
//   );
// };
