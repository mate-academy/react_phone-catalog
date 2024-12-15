import { useState } from 'react';
import './Header.scss';
import '../../../public/img/icon-like.png';

export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItemCount, setCartItemCount] = useState<number>(1); // Стан для кількості товарів в кошику

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo">
          <img src="../../../public/img/logo/logo-icon.svg" className="logo-icon" alt="logo" />
        </a>
        <div className="header__navigation">
          <a
            href="#"
            className={`header__navigation-link ${activeTab === 'home' ? 'is-active' : ''}`}
            onClick={() => handleTabClick('home')}
          >
            home
          </a>
          <a
            href="#"
            className={`header__navigation-link ${activeTab === 'phones' ? 'is-active' : ''}`}
            onClick={() => handleTabClick('phones')}
          >
            phones
          </a>
          <a
            href="#"
            className={`header__navigation-link ${activeTab === 'tablets' ? 'is-active' : ''}`}
            onClick={() => handleTabClick('tablets')}
          >
            tablets
          </a>
          <a
            href="#"
            className={`header__navigation-link ${activeTab === 'accessories' ? 'is-active' : ''}`}
            onClick={() => handleTabClick('accessories')}
          >
            accessories
          </a>
        </div>
      </div>
      <div className="icons">
      <a
          href="#"
          className="burger-menu"
        >
          <img src="../../../public/img/Menu.png" className="burger-menu-icon" alt="menu" />
        </a>
        <a
          href="#"
          className={`like ${activeTab === 'like' ? 'is-active' : ''}`}
          onClick={() => handleTabClick('like')}
        >
          <img src="../../../public/img/icon-like.png" className="like-icon" alt="like" />
        </a>
        <a
          href="#"
          className={`bag ${activeTab === 'bag' ? 'is-active' : ''}`}
          onClick={() => handleTabClick('bag')}
        >
          <img src="../../../public/img/icon-bag.png" className="bag-icon" alt="bag" />
          {cartItemCount > 0 && (
            <div className="cart-badge">
              {cartItemCount}
            </div>
          )}
        </a>
      </div>
    </header>
  );
};

