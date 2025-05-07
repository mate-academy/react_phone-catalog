import style from './Header.module.scss';
import classNames from 'classnames';
import { HeaderLinks } from '../HeaderLinks';
import { FavCarIcons } from '../FavCarIcons';
import { StateContext } from '../GlobalProvider';
import { useContext } from 'react';
import { MenuCloseIcons } from './MenuCloseIcons';
import { SiteLogo } from '../SiteLogo';
import { SearchModule } from './SearchModule';

export const Header = () => {
  const { showMenu, showSearch } = useContext(StateContext);

  return (
    <div className={classNames(style.container)}>
      <div className={classNames(style.header_logo)}>
        <SiteLogo />
      </div>

      {!showMenu && (
        <div className={classNames(style.header_links)}>
          <HeaderLinks />
        </div>
      )}

      <div className={classNames(style.header_icons)}>
        {!showMenu && (
          <div className={classNames(style.header_icons_fav_cart)}>
            <FavCarIcons />
          </div>
        )}

        <div className={classNames(style.header_icons_menu)}>
          <MenuCloseIcons />
        </div>

        {showSearch && !showMenu && (
          <div className={style.header_icons_search}>
            <SearchModule />
          </div>
        )}
      </div>
    </div>
  );
};
