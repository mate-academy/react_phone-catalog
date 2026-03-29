import { Link } from 'react-router-dom';

import s from './FooterLinks.module.scss';

const FooterLinks = () => {
  return (
    <nav className={s.nav}>
      <Link
        className={s.nav__link}
        to="https://github.com/heorhii-lytvynenko"
      >
        Github
      </Link>
      <Link
        className={s.nav__link}
        to="https://linkedin.com/in/heorhii-lytvynenko"
      >
        Contacts
      </Link>
      <Link className={s.nav__link} to="https://example.com">
        Rights
      </Link>
    </nav>
  );
};

export default FooterLinks;
