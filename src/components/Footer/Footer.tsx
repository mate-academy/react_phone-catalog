/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import './Footer.scss';
import '../../styles/button.scss';
import '../../styles/container.scss';

export const Footer = () => {
  const options = [
    { id: 'github', url: 'https://github.com/Svyatoslav-kolom' },
    { id: 'contacts', url: 'https://contacts' },
    { id: 'rights', url: 'https:///rights' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <img src="icons/Logo.svg" alt="Logo" className="footer__logo" />

          <nav className="nav footer__nav">
            {options.map(option => (
              <Link key={option.url} to={option.url} className="nav__item">
                {option.id}
              </Link>
            ))}
          </nav>

          <div className="footer__back-to-top">
            <p className="footer__back-to-top__text small-text">Back to top</p>

            <button onClick={scrollToTop} className="button">
              <img
                src="icons/Arrow-up.svg"
                alt="top"
                className="footer__up-arrow button"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
