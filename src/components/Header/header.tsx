import './header.scss';
import { useState } from 'react';
export const Header = () => {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (linkName: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveLink(linkName);
  };

  return (
    <header className="header">
      <a href="#" className="header__logo">
        <img
          src="../../../public/img/logo/Logo.svg"
          alt="logo"
          className="header__logo__image"
        />
      </a>
      <nav className="header__nav">
        <a
          className={`header__nav__link ${activeLink === 'home' ? 'is-active' : ''}`}
          href="#"
          onClick={e => handleLinkClick('home', e)}
        >
          home
        </a>
        <a
          className={`header__nav__link ${activeLink === 'phones' ? 'is-active' : ''}`}
          href="#"
          onClick={e => handleLinkClick('phones', e)}
        >
          phones
        </a>
        <a
          className={`header__nav__link ${activeLink === 'tablets' ? 'is-active' : ''}`}
          href="#"
          onClick={e => handleLinkClick('tablets', e)}
        >
          tablets
        </a>
        <a
          className={`header__nav__link ${activeLink === 'accessories' ? 'is-active' : ''}`}
          href="#"
          onClick={e => handleLinkClick('accessories', e)}
        >
          accessories
        </a>
      </nav>

      <div className="header__icons">
        <a href="#" className="header__icons--favourites"></a>

        <a href="#" className="header__icons--bag"></a>
      </div>
    </header>
  );
};
