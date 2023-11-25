import { Logo } from '../additional/Logo';
import { TopButton } from '../additional/TopButton';

export const Footer = () => {
  return (
    <footer className="footer">
      <Logo />

      <div className="footer__nav">
        <a
          href="https://github.com/Hlazman"
          target="_blank"
          rel="noreferrer"
          className="footer__nav__link"
        >
          Github
        </a>

        <a
          href="https://github.com/Hlazman"
          target="_blank"
          rel="noreferrer"
          className="footer__nav__link"
        >
          Contacts
        </a>

        <a
          href="https://github.com/Hlazman"
          target="_blank"
          rel="noreferrer"
          className="footer__nav__link"
        >
          Rights
        </a>

      </div>

      <TopButton />
    </footer>
  );
};
