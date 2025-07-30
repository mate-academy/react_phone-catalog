import { useState } from 'react';
import { Menu } from '../../components/menu';
import { TopBar } from '../../components/top-bar';
import { useMediaQuery } from 'react-responsive';
import styles from './header.module.scss';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 639 });

  return (
    <header className={styles.header}>
      <TopBar
        setOpenMenu={setOpenMenu}
        openMenu={openMenu}
        isMobile={isMobile}
      />
      {isMobile && openMenu && <Menu openMenu={openMenu} />}
    </header>
  );
};
