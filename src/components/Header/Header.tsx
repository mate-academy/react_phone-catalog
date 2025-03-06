import React, { useState } from 'react';
import { HeaderNav } from './HeaderNav';
import { UserMenu } from './UserMenu';
import { SiteLogo } from '../SiteLogo/SiteLogo';
import headerStyles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={headerStyles.header}>
        <div
          className={`${headerStyles.header__container} ${headerStyles.header__topBar}`}
        >
          <div className={headerStyles.header__nav}>
            <SiteLogo className={headerStyles.header__logo} />
            <HeaderNav />
          </div>
          <div className={headerStyles.header__icons}>
            <UserMenu />
          </div>
        </div>

        <div
          className={`${headerStyles.header__mobileMenu} ${headerStyles.header__topBar}`}
        >
          <SiteLogo className={headerStyles.header__logo} />
          <button
            className={`${headerStyles.header__menuBtn} icon`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={
                isMenuOpen
                  ? '/public/img/icons/close.svg'
                  : '/public/img/icons/menu.svg'
              }
              alt=""
            />
          </button>
        </div>
      </header>
      <MobileMenu isMenuOpen={isMenuOpen} />
    </>
  );
};
