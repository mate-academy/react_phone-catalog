/* eslint-disable @typescript-eslint/no-var-requires */
import cn from 'classnames';
import {
  FC, useContext, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Category } from '../../types/Category';
import { Styles } from '../../types/Styles';
import { Logo } from '../Logo';
import { NavBar } from '../NavBar';
import { SearchBar } from '../SearchBar';

const styles: Styles = require('./Header.module.scss');

const {
  Header: header,
  'Header--dark': headerDark,
  Header__Logo: logo,
  Header__SearchBar: searchBar,
  Header__nav: nav,
  'Header__nav--open': navOpen,
  Header__actions: actions,
  'Header__actions-button': actionsButton,
  'Header__actions-button--dark': actionsButtonDark,
  'Header__actions-button--menu': actionsButtonMenu,
} = styles;

type Props = {
  className?: string;
};

export const Header: FC<Props> = ({ className = '' }) => {
  const { isThemeDark, onThemeChange, theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { category, productID } = useParams();

  const isSearchBarShown = Object.values(Category)
    .includes(category as Category) && !productID;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('body--with-menu');
    } else {
      document.body.classList.remove('body--with-menu');
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleNavLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        className,
        header,
        { [headerDark]: isThemeDark },
      )}
    >
      <Logo className={logo} />

      <NavBar
        className={cn(
          nav,
          { [navOpen]: isMenuOpen },
        )}
        onMenuToggle={handleMenuToggle}
        onNavLinkClick={handleNavLinkClick}
      />

      <div className={actions}>
        {isSearchBarShown && (
          <SearchBar className={searchBar} />
        )}

        <button
          onClick={onThemeChange}
          type="button"
          className={cn(
            actionsButton,
            { [actionsButtonDark]: isThemeDark },
          )}
        >
          <img
            src={`./icons/Theme_${theme}.svg`}
            alt="theme"
          />
        </button>

        <button
          onClick={handleMenuToggle}
          type="button"
          className={cn(
            actionsButton,
            actionsButtonMenu,
            { [actionsButtonDark]: isThemeDark },
          )}
        >
          <img
            src={`./icons/Menu_${theme}.svg`}
            alt="menu"
          />
        </button>
      </div>
    </header>
  );
};

Header.defaultProps = {
  className: '',
};
