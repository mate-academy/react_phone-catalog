import s from './Header.module.scss';

import { Link } from 'react-router-dom';
import { LINK_TO } from '../../constants';
import { Nav } from '../Nav/Nav';
import { IconsFavoriteShop } from '../IconsFavotireShop/IconsFavoriteShop';

import { useMenu, useSetMenu } from '../../context/MenuContext';
import HeaderLogo from '../../img/icons/icon-logo.svg?react';
import MenuIcon from '../../img/icons/icon-menu.svg?react';
import CloseIcon from '../../img/icons/icon-close.svg?react';

export const Header = () => {
  const setMenu = useSetMenu();
  const isMenu = useMenu();
  const handleClickMenu = () => setMenu(!isMenu);

  return (
    <header className={s.Header}>
      <div className={s.Header__content}>
        <Link to={LINK_TO.HOME} className={(s.Header__link, s.Header__logo)}>
          <HeaderLogo className="logo" />
        </Link>
        <Nav />
        <div className={s.Header__iconsRight}>
          <IconsFavoriteShop className={s.Header__left} />
          <button
            className={`icon-header ${s.Header__right}`}
            onClick={handleClickMenu}
          >
            {isMenu ? (
              <CloseIcon className="icon" />
            ) : (
              <MenuIcon className="icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
