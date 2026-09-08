import cl from 'classnames';
import { Nav } from '../Nav/Nav';
import s from './Menu.module.scss';
import { useEffect } from 'react';
import { IconsFavoriteShop } from '../IconsFavotireShop/IconsFavoriteShop';
import { useMenu, useSetMenu } from '../../context/MenuContext';

export const Menu: React.FC = () => {
  const isMenu = useMenu();
  const setMenu = useSetMenu();

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenu);

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenu]);

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth >= 640) {
        setMenu(false);
      }
    };

    closeMenu();

    window.addEventListener('resize', closeMenu);

    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <aside
      className={cl(s.Menu, {
        [s.Menu__active]: isMenu,
      })}
    >
      <Nav isMenuOpen={isMenu} />
      <IconsFavoriteShop className={s.Menu__icons} />
    </aside>
  );
};
