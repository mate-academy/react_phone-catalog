import { useEffect, useState, useRef } from 'react';
import { HeaderIcon } from '../HeaderIcon';
import style from './Header.module.scss';
import { Menu } from '../Menu';
import { NavigateLinks } from '../NavigateLinks';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [showNavigate, setShowNavigate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 640;

      setShowNavigate(isDesktop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [showMenu]);

  return (
    <>
      <header className={style.header} ref={headerRef}>
        <div className={style.header__top}>
          <Link to="/" className={style.header__logo}>
            <img src="icons/logo.png" alt="Nice Gadgets logo" />
          </Link>

          {showNavigate && <NavigateLinks />}

          <div className={style.header__icons}>
            {showMenu && (
              <HeaderIcon
                iconName="close"
                onClickIcon={() => setShowMenu(false)}
              />
            )}

            {!showNavigate && !showMenu && (
              <HeaderIcon
                iconName="menu"
                onClickIcon={() => setShowMenu(true)}
              />
            )}

            {showNavigate && (
              <>
                <HeaderIcon iconName={'favourites'} />
                <HeaderIcon iconName={'cart'} />
              </>
            )}
          </div>
        </div>
      </header>
      <Menu
        showMenu={showMenu}
        headerHeight={headerRef?.current?.offsetHeight || 0}
        setShowMenu={setShowMenu}
      />
    </>
  );
};
