import './TopBar.scss';
import {
  logoLightMode,
  logoDarkMode,
  icons,
} from '../../../global-assets/static';
import type { IconList } from '../../shared/types/IconList';
import { useContext } from 'react';
import { ProductListContext } from '../../shared/context/ProductListContext';
import {
  ScreenState,
  UISettingsState,
} from '../../shared/reducer/LangThemeReducer';
import { ThemeLanguageSwitcher } from '../../shared/components/ui/ThemeLanguageSwitcher';
import { getPath } from '../../shared/servises/getPath';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { TranslationContext } from '../../../i18next/shared/TranslationContext';
import { FavesContext } from '../../shared/context/FavesContext';
import { StateCartContext } from '../../shared/reducer/CartReducer';

type TopBarProps = {
  buttonData: IconList['menu'] | IconList['close'];
};

export const TopBar: React.FC<TopBarProps> = ({ buttonData }) => {
  const { favourites } = useContext(FavesContext);
  const { cartList } = useContext(StateCartContext);
  const { setIsAside } = useContext(ProductListContext);
  const settingsState = useContext(UISettingsState);
  const { isDesktop, isMobile } = useContext(ScreenState);
  const IconSvg = buttonData.valuePath;
  const IconLike = icons.like.valuePath;
  const IconCart = icons.cart.valuePath;

  const navTitleList = useContext(TranslationContext).navList;
  const navigationList = navTitleList.slice(0, 4);

  const handleClose = () => {
    setIsAside(false);
  };

  return (
    <div className="top-bar">
      <div className="top-bar__logo">
        {settingsState.theme === 'light' ? (
          <img src={logoLightMode} alt="Compamy logo" />
        ) : (
          <img src={logoDarkMode} alt="Compamy logo" />
        )}
      </div>

      {isMobile && <ThemeLanguageSwitcher />}

      <nav className="top-bar__nav-wrapper">
        <ul className="top-bar__nav-list">
          {navigationList.map(listItem => (
            <li key={listItem.link}>
              <NavLink
                to={getPath(listItem.link)}
                className={({ isActive }) =>
                  classNames('top-bar__nav-link', {
                    'top-bar__nav-link--active': isActive,
                  })
                }
              >
                {listItem.title.toUpperCase()}
                <br />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="top-bar__btns">
          {isDesktop && <ThemeLanguageSwitcher />}
          <NavLink
            to="favourites"
            className={({ isActive }) =>
              classNames('top-bar__button', {
                'top-bar__button-is-active': isActive,
              })
            }
          >
            {favourites.length > 0 && (
              <div className="top-bar__button__amount-indicator">
                {favourites.length}
              </div>
            )}
            <IconLike className="top-bar__button--icon" />
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              classNames('top-bar__button', {
                'top-bar__button-is-active': isActive,
              })
            }
          >
            {cartList.length > 0 && (
              <div className="top-bar__button__amount-indicator">
                {cartList.length}
              </div>
            )}
            <IconCart className="top-bar__button--icon" />
          </NavLink>
        </div>
      </nav>

      <div className="top-bar__nav">
        {buttonData.valueName === 'menu' ? (
          <button className="top-bar__button" onClick={() => setIsAside(true)}>
            <IconSvg className="top-bar__button--icon" />
          </button>
        ) : (
          <button onClick={handleClose} className="top-bar__button">
            <IconSvg className="top-bar__button--icon" />
          </button>
        )}
      </div>
    </div>
  );
};
