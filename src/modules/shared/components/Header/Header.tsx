import styles from './Header.module.scss';

import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HeaderActions } from './components/HeaderActions';

export const Header = () => {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderActions />
    </div>
  );
};
