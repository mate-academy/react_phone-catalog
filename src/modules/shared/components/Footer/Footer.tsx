import React from 'react';

import styles from './Footer.module.scss';
import { Container } from '../Container';
import { Link } from 'react-router-dom';
import { AppButton } from '../appButton';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <nav className={styles.footerNav}>
          <Link className={styles.footerLogoLink} to={'/'}>
            <img
              className={styles.footerLogo}
              src="img/header-logo.png"
              alt="Nice gadgets logo"
            />
          </Link>

          <ul className={styles.list}>
            <li className={styles.navItem}>
              <Link className="link" to={'/'}>
                Github
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className="link" to={'/'}>
                Contacts
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className="link" to={'/'}>
                Rights
              </Link>
            </li>
          </ul>

          <div className={styles.goTopBox}>
            <div className={styles.goTopBoxContent} onClick={scrollToTop}>
              <span className={styles.goTopBoxText}>Back to top</span>
              <AppButton>
                <img
                  className="icons"
                  src="img/icons/arrow-up.svg"
                  alt="arrow up"
                />
              </AppButton>
            </div>
          </div>
        </nav>
      </Container>
    </footer>
  );
};
