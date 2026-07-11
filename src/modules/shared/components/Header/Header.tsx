import React, { useEffect, useState } from 'react';
import './Header.scss';
import { Navbar } from './components/Navbar';
import { MainLogo } from '../MainLogo';
import { ButtonHeader } from './components/ButtonHeader';
import { BurgerMenu } from './components/BurgerMenu';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Buttons/Button';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { ThemeSwitch } from './components/ThemeSwitch';
import { LanguageSwitch } from './components/LanguageSwitch';
import { AnimatePresence, motion } from 'framer-motion';
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll';

type Props = {
  className: string;
};

const MOBILE_BREAKPOINT = 640;

export const Header: React.FC<Props> = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { cartItems, favoritesItems } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLockBodyScroll(menuOpen);

  const openSettings = () => {
    if (settingsOpen) {
      setSettingsOpen(false);
    } else {
      setSettingsOpen(true);
    }
  };

  const openPage = (path: string) => {
    navigate(path);
  };

  const openMenu = () => {
    window.scrollTo({ top: 0 });
    setMenuOpen(true);
  };

  return (
    <header className={`header ${className}`}>
      <MainLogo className="header__logo" />
      <Navbar className="header__navbar" />
      <div className="header__buttons">
        <Button
          className="header__button header__button--settings"
          name="settings"
          onClick={() => openSettings()}
        />
        <AnimatePresence>
          {settingsOpen && (
            <motion.div
              className="header__settings"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ThemeSwitch className="header__theme-switch" />
              <LanguageSwitch className="header__language-switch" />
            </motion.div>
          )}
        </AnimatePresence>
        {menuOpen ? (
          <Button
            className="header__button header__button--dagger"
            name="close"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <Button
            className="header__button header__button--menu"
            name="menu"
            onClick={() => openMenu()}
          />
        )}
        <ButtonHeader
          className="header__button header__button--favourites"
          onClick={() => openPage('/favourites')}
          name="heart-like"
          kind="favourites"
          showGuantity={favoritesItems.length > 0}
        />
        <ButtonHeader
          className="header__button header__button--shopping-bag"
          onClick={() => openPage('/cart')}
          name="shopping-bag"
          kind="cart"
          showGuantity={cartItems.length > 0}
        />
      </div>
      <BurgerMenu
        className={classNames('header__burger-menu', {
          'header__burger-menu--is-active': menuOpen,
        })}
        closeMenu={() => setMenuOpen(false)}
      />
    </header>
  );
};
