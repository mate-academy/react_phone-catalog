import { NavLink } from 'react-router-dom';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer Footer__container">
      <div className="Footer__content page__container">
        <NavLink to="/" className="Footer__logo icon--logo" />

        <div className="Footer__links">
          <NavLink
            to="https://github.com/no4kar/react_phone-catalog"
            className="Footer__link"
          >
            github
          </NavLink>

          <NavLink
            to="https://github.com/no4kar/react_phone-catalog"
            className="Footer__link"
          >
            contacts
          </NavLink>

          <NavLink
            to="https://github.com/no4kar/react_phone-catalog"
            className="Footer__link"
          >
            rights
          </NavLink>
        </div>

        <div className="scroll-to-top">
          <p className="scroll-to-top__title">Back to top</p>
          <button
            aria-label="Scroll to top"
            className="scroll-to-top__button icon--arrow-up"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
      </div>
    </footer>
  );
};
