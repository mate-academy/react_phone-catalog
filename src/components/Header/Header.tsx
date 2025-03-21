import s from './Header.module.scss';

import { Link } from 'react-router-dom';
import { LINK_TO } from '../../constants';
import { Nav } from '../Nav/Nav';
import { IconsFavoriteShop } from '../IconsFavotireShop/IconsFavoriteShop';
import { useMenu, useSetMenu } from '../../context/MenuContext';

export const Header = () => {
  const setMenu = useSetMenu();
  const isMenu = useMenu();

  const handleClickMenu = () => setMenu(!isMenu);

  return (
    <header className={s.Header}>
      <div className={s.Header__content}>
        <Link to={LINK_TO.HOME} className={(s.Header__link, s.Header__logo)}>
          <img
            src="/img/icons/icon-logo.png"
            alt="logo"
            className={s.Header__logoImg}
          />
        </Link>
        <Nav />
        <div className={s.Header__iconsRight}>
          <IconsFavoriteShop className={s.Header__left} />
          <button
            className={`icon-header ${s.Header__right}`}
            onClick={handleClickMenu}
          >
            <img
              src={`/img/icons/icon-${isMenu ? 'closeBlack' : 'menu'}.svg`}
              alt=""
              className="icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
