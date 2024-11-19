import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Logo } from '@shared/components/Logo';
import { useTheme } from '@shared/contexts/Theme.context';

import { BackToTopBtn } from './components/BackToTopBtn';
import { FooterNavigation } from './components/FooterNavigation';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <Box className={styles.footer}>
      <Box className={cn('container', styles.container)}>
        <Logo variant={theme} className={styles.logo} />

        <Box className={styles.footerNavigation}>
          <FooterNavigation />
        </Box>

        <Box className={styles.backToTopBtn}>
          <BackToTopBtn />
        </Box>
      </Box>
    </Box>
  );
};
