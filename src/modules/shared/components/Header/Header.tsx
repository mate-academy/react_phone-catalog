import Logo from '../Logo';
import styles from './Header.module.scss';
import React, { RefObject, useState } from 'react';
import NavMenu from './components/NavMenu';
import { LuMenu } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';

const Header: React.FC<{ headerRef?: RefObject<HTMLElement> }> = ({

}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className={styles.header}>
      <Logo />

      <NavMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />

      <button
        className={styles.header__button}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? <IoClose /> : <LuMenu />}
      </button>
    </div>
  );
};

export default Header;
