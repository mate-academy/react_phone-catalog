import React, { useCallback, useEffect, useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { UserMenu } from './components/UserMenu';
import { SiteLogo } from '../SiteLogo/SiteLogo';
import headerStyles from './Header.module.scss';
import { MobileMenu } from './components/MobileMenu';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import classNames from 'classnames';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth >= 640) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <header className={headerStyles.header}>
      <div
        className={classNames(
          headerStyles.header__topBar,
          headerStyles.header__topBarContainer,
        )}
      >
        <div className={headerStyles.header__productNav}>
          <SiteLogo className={headerStyles.header__logo} />
          <HeaderNav />
        </div>
        <div className={headerStyles.header__userControls}>
          <UserMenu />
        </div>
      </div>

      <div
        className={classNames(
          headerStyles.header__topBar,
          headerStyles.header__mobileTopBarContainer,
        )}
      >
        <SiteLogo className={headerStyles.header__logo} />
        <button
          className={classNames(headerStyles.header__menuBtn, 'button')}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconSvg
            dataPath={isMenuOpen ? ICON_DATA_PATHS.CLOSE : ICON_DATA_PATHS.MENU}
          />
        </button>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
