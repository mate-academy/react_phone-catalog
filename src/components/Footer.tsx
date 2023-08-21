import { Link, NavLink } from 'react-router-dom';

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
        <Link className="text__uppercase" to="/github">
          github
        </Link>
        <Link className="text__uppercase" to="/contacts">
          contacts
        </Link>
        <Link className="text__uppercase" to="/rights">
          rights
        </Link>
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
