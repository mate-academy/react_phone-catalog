import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { TopBar } from './components/TopBar';
import { Menu } from './components/Menu/Menu';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpenMenu]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <>
      <header className={styles['header']}>
        <TopBar setOpen={setIsOpenMenu} type="Header"></TopBar>
      </header>
      <Menu isOpen={isOpenMenu} setOpen={setIsOpenMenu} />
    </>
  );
};
