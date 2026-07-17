import { useState } from 'react';
import styles from './Header.styles.module.scss';
import { TopBar } from './Components/TopBar';
import { Menu } from './Components/Menu';

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <TopBar onMenuToggle={() => setIsOpenMenu(prev => !prev)} />
      </header>
      <Menu isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
    </>
  );
};
