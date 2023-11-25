import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Logo } from '../Logo';
import './footer.scss';

const links = [
  {
    name: 'Github',
    to: 'https://github.com/bojkovladislav',
  },
  {
    name: 'Contacts',
    to: '/',
  },
  {
    name: 'Rights',
    to: '/',
  },
];

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = useAppSelector(state => state.theme.value);

  return (
    <footer className={`footer__wrapper footer__wrapper--${theme}`}>
      <Logo />

      <ul className="footer__nav-list">
        {links.map(({ name, to }) => (
          <li
            className="footer__nav-item"
            key={name}
          >
            <Link
              to={to}
              className={`footer__nav-link footer__nav-link--${theme}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="footer__back-to-top-wrapper">
        <p className="footer__back-to-top-text">
          Back to top
        </p>
        <button
          className={`footer__back-to-top-button footer__back-to-top-button--${theme}`}
          onClick={scrollToTop}
          type="button"
        >
          {theme === 'light' ? (
            <img
              src="new/img/icons/back-to-top-dark.svg"
              alt="Back to top button"
            />
          ) : (
            <img
              src="new/img/icons/back-to-top-light.svg"
              alt="Back to top button"
            />
          )}
        </button>
      </div>
    </footer>
  );
};
