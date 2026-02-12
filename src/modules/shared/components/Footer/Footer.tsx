import React from 'react';

import styles from './Footer.module.scss';
import { Container } from '../container';
import { Link } from 'react-router-dom';
import { AppButton } from '../appButton';
import { getLogo } from '../../../../utils/getLogo';
import { ArrowUpSvg } from '../../svg/ArrowUpSvg';
import { useAppSelector } from '../../../../app/hooks';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export const Footer: React.FC = () => {
  const theme = useAppSelector(s => s.theme);

  return (
    <footer className={styles.footer}>
      <Container>
        <nav className={styles.footerNav}>
          <Link className={styles.footerLogoLink} to={'/'}>
            <img
              className={styles.footerLogo}
              src={getLogo(theme)}
              alt="Nice gadgets logo"
            />
          </Link>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link className={`link ${styles.link}`} to={'/'}>
                Github
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={`link ${styles.link}`} to={'/'}>
                Contacts
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={`link ${styles.link}`} to={'/'}>
                Rights
              </Link>
            </li>
          </ul>

          <div className={styles.goTopBox}>
            <div className={styles.goTopBoxContent} onClick={scrollToTop}>
              <span className={styles.goTopBoxText}>Back to top</span>
              <AppButton buttonName={'arrow up'}>
                <ArrowUpSvg style={{ color: 'var(--active-arrow-svg)' }} />
              </AppButton>
            </div>
          </div>
        </nav>
      </Container>
    </footer>
  );
};
