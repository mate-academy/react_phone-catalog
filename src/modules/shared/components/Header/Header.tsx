import Logo from '../Logo';
import styles from './Header.module.scss';
import React, { RefObject, useState } from 'react';
import NavMenu from './components/NavMenu';

const Header: React.FC<{ headerRef: RefObject<HTMLElement> }> = ({
  headerRef,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header ref={headerRef} id="back-to-top" className={styles.header}>
      <Logo />

      <NavMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />

      <button
        className={styles.header__button}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? (
          <span className="icon-delete"></span>
        ) : (
          <span className="icon-menu"></span>
        )}
      </button>
    </header>
  );
};

export default Header;
