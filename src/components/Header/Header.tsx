import logo from '/img/logo/Logo.svg';
import { Link } from 'react-router-dom';
import header from './Header.module.scss';
import classNames from 'classnames';
import { IconMenu } from '../../shared/IconMenu';
import { IconClose } from '../../shared/IconClose';
import { PageNavigation } from '../PageNavigation';
import { NavigationLink, NavigationLinks } from '../NavigationLink';
import { AppRoutes } from '../Router';

type Props = {
  isMenuOpened: boolean;
  onToggleMenu: () => void;
};

export const Header = ({ isMenuOpened, onToggleMenu }: Props) => {
  return (
    <header className={header.header}>
      <Link to={AppRoutes.HOME} className={header.logoLink}>
        <img src={logo} alt="Logo" className={header.logo} />
      </Link>
      <div className={header.container}>
        <PageNavigation />
        <nav className={header.buttons}>
          <li className={classNames(header.button, header.buttonHiddenMobile)}>
            <NavigationLink navigationType={NavigationLinks.Favorite} />
          </li>
          <li className={classNames(header.button, header.buttonHiddenMobile)}>
            <NavigationLink navigationType={NavigationLinks.Cart} />
          </li>
          <li className={classNames(header.button, header.buttonHiddenDesktop)}>
            <button className={header.buttonMenu} onClick={onToggleMenu}>
              {isMenuOpened ? <IconClose /> : <IconMenu />}
            </button>
          </li>
        </nav>
      </div>
    </header>
  );
};
