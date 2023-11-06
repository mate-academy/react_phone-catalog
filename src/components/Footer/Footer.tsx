import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer">
      <Logo />

      <Link to="https://rialleons.github.io/react_phone-catalog/">
        Github
      </Link>

      <Link to="/">
        Contacts
      </Link>

      <Link to="/">
        Rights
      </Link>

      <Link to="/">
        Back to top
      </Link>
    </footer>
  );
};
