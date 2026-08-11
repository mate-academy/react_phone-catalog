import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SearchInput } from '../SearchInput/SearchInput';
import styles from './Header.module.scss';
import { translations } from '../../locales';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header: React.FC = () => {
  const { theme, toggleTheme, language, changeLanguage, cart, favorites } =
    useApp();
  const { pathname } = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleBurgerToggle = () => setIsBurgerOpen(!isBurgerOpen);
  const handleBurgerClose = () => setIsBurgerOpen(false);

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(pathname);

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
  <header className={styles.header}>
    <div className={`${styles.container} ${isSearchFocused ? styles['container--search-focused'] : ''}`} >
      
      {/* 1. ЛОГОТИП — Додано BASE_URL та роздільний слеш */}
      <NavLink to="/" className={styles.logo} onClick={() => setIsSearchFocused(false)} >
        <img 
          src={theme === 'dark' 
            ? `${import.meta.env.BASE_URL}/logo.dark.svg` 
            : `${import.meta.env.BASE_URL}/logo.svg`
          } 
          alt="Nice Gadgets Logo" 
        />
      </NavLink>

      {/* 2. НАВІГАЦІЯ (Home, Phones...) */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={styles.navLink} onClick={() => setIsSearchFocused(false)} >
              {translations.header.home[language]}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/phones" className={styles.navLink} onClick={() => setIsSearchFocused(false)} >
              {translations.header.phones[language]}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/tablets" className={styles.navLink} onClick={() => setIsSearchFocused(false)} >
              {translations.header.tablets[language]}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/accessories" className={styles.navLink} onClick={() => setIsSearchFocused(false)} >
              {translations.header.accessories[language]}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 3. ІНПУТ ПОШУКУ */}
      {showSearch && (
        <div className={`${styles.searchWrapper} ${isSearchFocused ? styles['searchWrapper--active'] : ''}`}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsSearchFocused(false);
            }
          }}
        >
          <SearchInput />
        </div>
      )}

      {/* 4. БЛОК КНОПОК ДІЙ */}
      <div className={styles.actions}>
        <div className={styles.themeToggle} onClick={toggleTheme}>
          <input type="checkbox" checked={theme === 'dark'} className={styles.themeInput} readOnly />
          <span className={styles.themeSlider}>
            <span className={styles.themeIcon}>
              {theme === 'light' ? '☀️' : '🌙'}

            </span>
          </span>
        </div>
        
        <button type="button" className={styles.actionBtn} onClick={() => changeLanguage(language === 'eng' ? 'ukr' : 'eng')} >
          {language === 'eng' ? 'ENG' : 'UKR'}
        </button>

       
        <NavLink to="/favorites" className={styles.iconLink}>
          <img src={`${import.meta.env.BASE_URL}/favorites.svg`} alt="Favorites" className={styles.iconImg} />
          {favoritesCount > 0 && (
            <span className={styles.badge}>{favoritesCount}</span>
          )}
        </NavLink>

  
        <NavLink to="/cart" className={styles.iconLink}>
          <img src={`${import.meta.env.BASE_URL}/cart.svg`} alt="Cart" className={styles.iconImg} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </NavLink>
      </div>


      {!isBurgerOpen && (
        <button type="button" className={styles.burgerTrigger} onClick={handleBurgerToggle} aria-label="Open menu" >
          <img src={`${import.meta.env.BASE_URL}/img/icons/icon-open.svg`} alt="Open menu" className={styles.burgerIcon} />
        </button>
      )}
    </div>
    
    <BurgerMenu isOpen={isBurgerOpen} onClose={handleBurgerClose} favoritesCount={favoritesCount} cartCount={cartCount} theme={theme} toggleTheme={toggleTheme} language={language} changeLanguage={changeLanguage} />
  </header>
);

};
