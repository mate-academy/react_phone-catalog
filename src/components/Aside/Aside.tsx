import { NavLink, useLocation } from 'react-router-dom';
import style from './Aside.module.scss';
import { Icons } from '../../shared/ui/Icons';
import { IconId } from '../../types/icons';
import { useEffect, useRef } from 'react';
import { useFavourites } from '../../store/FavouritesContext';
import { Counter } from '../../shared/ui/Counter';

type Props = {
  closeMenu: () => void;
  totalItems: number;
  isOpen: boolean;
};

export const Aside: React.FC<Props> = ({ closeMenu, totalItems, isOpen }) => {
  const location = useLocation();
  const firstRenderRef = useRef(true);
  const {
    state: { favourite },
  } = useFavourites();

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      return;
    }

    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <aside className={isOpen ? style.asideOpen : style.asideMenu}>
      <div className={style.menuWrapper}>
        <nav className={style.menuNav} onClick={closeMenu}>
          <ul className={style.navList}>
            <li className={style.navItem}>
              <NavLink className={style.navLink} to="/">
                home
              </NavLink>
            </li>
            <li className={style.navItem}>
              <NavLink className={style.navLink} to="/phones">
                Phones
              </NavLink>
            </li>
            <li className={style.navItem}>
              <NavLink className={style.navLink} to="/tablets">
                tablets
              </NavLink>
            </li>
            <li className={style.navItem}>
              <NavLink className={style.navLink} to="/accessories">
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={style.bottomButtons} onClick={closeMenu}>
        <NavLink to="/favourites" className={style.bottomItem}>
          {favourite.length ? (
            <>
              <Icons id={IconId.Heart} />
              <Counter count={favourite.length} />
            </>
          ) : (
            <Icons id={IconId.Heart} />
          )}
        </NavLink>

        <NavLink to="/cart" className={style.bottomItem}>
          {totalItems ? (
            <>
              <Icons id={IconId.Cart} />
              <Counter count={totalItems} />
            </>
          ) : (
            <Icons id={IconId.Cart} />
          )}
        </NavLink>
      </div>
    </aside>
  );
};
