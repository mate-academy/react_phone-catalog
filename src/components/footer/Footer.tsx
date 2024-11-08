import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Logo } from '@ui/index';

import { LINKS } from '@utils/constants/footerLinks';
import { scrollToTop } from '@utils/helpers/scrollToTop';

import styles from './Footer.module.scss';
import { FooterButton } from './footer-button/FooterButton';
import { FooterNav } from './footer-nav/FooterNav';

export const Footer: FC = () => {
  const { t } = useTranslation();
  const localAria = t(`footer.aria.nav`);

  return (
    <footer>
      <div className="container">
        <div className={styles.footer}>
          <Logo onClickAction={scrollToTop} />

          <nav className={styles.contacts} aria-label={localAria}>
            {LINKS.map(link => (
              <FooterNav key={link.name} link={link} />
            ))}
          </nav>

          <FooterButton />
        </div>
      </div>
    </footer>
  );
};
