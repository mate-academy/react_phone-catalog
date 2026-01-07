import { Link } from 'react-router-dom';
import style from './BurgerMenu.module.scss';
import shop from '../../../public/img/my-icon/shopping.svg';
import whiteShop from '../../../public/img/theme-dark/shopping.svg';
import favorites from '../../../public/img/my-icon/favorites.svg';
import whiteFavorites from '../../../public/img/theme-dark/favorites.svg';
import { useContext } from 'react';

import { Navigate } from '../Header/component';
import { StateContext } from '../../provider/GlobalProvider';
import { ThemeContext } from '../../provider/ThemeContextProvider';

export const BurgerMenu = () => {
  const { favoritesCount, shopCount } = useContext(StateContext);
  const { theme } = useContext(ThemeContext);

  const themeNow = theme === 'white';

  const shopping = {
    favorites: themeNow ? favorites : whiteFavorites,
    shop: themeNow ? shop : whiteShop,
  };

  return (
    <div className={style.menu}>
      <Navigate modifier="menu" />

      <div className={style.shopping}>
        <Link
          className={`${style.shopping__link} ${style['shopping__link--favorite']}`}
          to={'/favorites'}
        >
          <div className={style.shopping__wrapper}>
            <img
              className={style.shopping__icon}
              src={shopping.favorites}
              alt="favorites"
            />
            {favoritesCount > 0 && (
              <div className={style.shopping__count}>{favoritesCount}</div>
            )}
          </div>
        </Link>
        <Link className={style.shopping__link} to={'/shop'}>
          <div className={style.shopping__wrapper}>
            <img
              className={style.shopping__icon}
              src={shopping.shop}
              alt="shopping"
            />
            {shopCount > 0 && (
              <div className={style.shopping__count}>{shopCount}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
