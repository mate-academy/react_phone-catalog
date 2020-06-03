import React, { useState, useEffect } from 'react';
import './Header.scss';
import { LinkType } from '../../interfaces';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { FavoritesIcon } from '../FavoritesIcon/FavoritesIcon';
import { CartIcon } from '../CartIcon/CartIcon';
import { SearchField } from '../SeachField/SearchField'
import { MobileNav } from '../MobileNav/MobileNav';
import { footerLinks } from '../Footer/Footer';



export const Header = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  let headerLinks: LinkType[] = [
    { title: 'HOME', address: '/#', isOuter: false },
    { title: 'PHONES', address: '/phones', isOuter: false },
    { title: 'TABLETS', address: '/tablets', isOuter: false },
    { title: 'ACCESSORIES', address: '/accessories', isOuter: false },
  ]

  const mobileLinks = [...headerLinks, ...footerLinks]

  useEffect(() => {
    const f = () => {
      if (isMobileNavVisible) {
        setIsMobileNavVisible(false)
      };
    };
    document.addEventListener('click', f)
    return () => { document.removeEventListener('click', f) }
  }, [isMobileNavVisible])

  return (
    <header className="Header">
      <div className="Header-wrapper">
        <div className="Header-left-wrapper">
          <Logo />
          <Nav
            links={headerLinks}
            addresses={['/cart']} />
        </div>
        <div className="Header-right-wrapper">
          <SearchField />
          <FavoritesIcon />
          <CartIcon />
          <button
            className={
              isMobileNavVisible
                ? "Header__button Header__button--close"
                : "Header__button"
            }
            onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}
          >

          </button>
          <MobileNav links={mobileLinks} isVisible={isMobileNavVisible} />
        </div>
      </div>

    </header>
  )
}

