import React from 'react';
import styles from './Footer.module.scss';
import { Container } from '../Container';
import { Link } from 'react-router-dom';
import { FooterNav } from './FooterNav';
import { ScrollToTopBtn } from './ScrollToTopBtn';
import Logo from '@public/img/logo/logo.svg?react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div className={styles.footerLeftSide}>
            <Link to="/" className={styles.footerLogoLink}>
              <Logo className={styles.footerLogo} />
            </Link>
          </div>

          <div className={styles.footerCenterSide}>
            <FooterNav />
          </div>

          <div className={styles.footerRightSide}>
            {t('footer.backToTop')}
            <ScrollToTopBtn />
          </div>
        </div>
      </Container>
    </footer>
  );
};
