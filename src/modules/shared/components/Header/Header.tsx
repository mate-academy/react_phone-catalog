import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HeaderActions } from './components/HeaderActions';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderActions />
    </div>
  );
};
