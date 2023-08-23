import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const linkClassNames = (
  { isActive } : { isActive : boolean },
) => classNames('footer__link text__uppercase', { active: isActive });

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__left">
        <NavLink className="logo" to="/" />
      </div>

      <div className="footer__centre">
        <NavLink
          className={linkClassNames}
          to="https://github.com/ihorivna007/react_phone-catalog/tree/develop"
        >
          github
        </NavLink>
        <NavLink className={linkClassNames} to="/contacts">
          contacts
        </NavLink>
        <NavLink className={linkClassNames} to="/rights">
          rights
        </NavLink>
      </div>

      <div className="footer__right">
        <div className="footer__back-to-top link-style">
          <p className="text__small">Back to top</p>
          <button
            type="button"
            aria-label="slider-button"
            className="slider-button slider-button__right footer__icon"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
