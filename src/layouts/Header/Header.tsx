import { Box } from '@shared/base/Box';
import { Logo } from '@shared/components/Logo';
import { useTheme } from '@shared/contexts/Theme.context';
import { useMedia } from '@shared/hooks/useMedia';

import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme } = useTheme();
  const { isMobile } = useMedia();

  return (
    <Box className={styles.header}>
      <Logo className={styles.logo} variant={theme} />

      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
    </Box>
  );
};
