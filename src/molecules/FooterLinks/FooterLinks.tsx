import { Link } from 'react-router-dom';

import styles from './FooterLinks.module.scss';

const FooterLinks = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.nav__link} to="github.com/heorhii-lytvynenko">
        Github
      </Link>
      <Link
        className={styles.nav__link}
        to="linkedin.com/in/heorhii-lytvynenko"
      >
        Contacts
      </Link>
      <Link className={styles.nav__link} to="example.com">
        Rights
      </Link>
    </nav>
  );
};

export default FooterLinks;
