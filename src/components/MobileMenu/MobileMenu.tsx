import classNames from 'classnames';
import style from './MobileMenu.module.scss';
import { HeaderLinks } from '../HeaderLinks';
import { FavCarIcons } from '../FavCarIcons';
import { useContext } from 'react';
import { StateContext } from '../GlobalProvider';

export const MobileMenu = () => {
  const { showMenu } = useContext(StateContext);

  return (
    <div
      className={classNames(style.wraper, {
        [style.wraper_up]: showMenu,
      })}
    >
      <div className={classNames(style.container)}>
        <div className={classNames(style.container_links)}>
          <HeaderLinks />
        </div>
        <div className={classNames(style.container_icons)}>
          <FavCarIcons mobileView={true} />
        </div>
      </div>
    </div>
  );
};
