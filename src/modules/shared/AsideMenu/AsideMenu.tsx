import { Link } from 'react-router-dom';
import './AsideMenu.scss';
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { StateContext } from '../../../contexts/AppContext/AppContext';
import { scrollToTop } from '../../../helpers/scrollToTop';
import { Navbar } from '../Navbar';
import { ThemeContext } from '../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../helpers/getIconSrc';

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AsideMenu: React.FC<Props> = ({ isOpenMenu, setIsOpenMenu }) => {
  const { theme } = useContext(ThemeContext);
  const { favorites, cart } = useContext(StateContext);

  const handleCloseMenu = () => {
    scrollToTop();
    setIsOpenMenu((prev: boolean) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639 && isOpenMenu) {
        setIsOpenMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpenMenu, setIsOpenMenu]);

  return (
    <aside
      className={classNames('burgerMenu menu', {
        'burgerMenu--shown': isOpenMenu,
      })}
    >
      <div className="burgerMenu__header">
        <Link to="/" className="header__logo" onClick={handleCloseMenu}>
          <img
            className="header__logo-image"
            src={getIconSrc('logo', theme)}
            alt="logo"
          />
        </Link>
        <button
          type="button"
          className="header__burgerMenu"
          onClick={handleCloseMenu}
        >
          <img src={getIconSrc('close', theme)} alt="menu" className="icon" />
        </button>
      </div>

      <div className="burgerMenu__content">
        <Navbar onClick={handleCloseMenu} />
      </div>

      <div className="burgerMenu__footer">
        <Link
          to="/favorites"
          className="burgerMenu__button burgerMenu__favourities"
          onClick={handleCloseMenu}
        >
          <img
            src={getIconSrc('heart', theme)}
            alt="favourities"
            className="icon"
          />
          {!!favorites.length && (
            <span className="itemCounter">{favorites.length}</span>
          )}
        </Link>
        <Link
          to="/cart"
          className="burgerMenu__button burgerMenu__cart"
          onClick={handleCloseMenu}
        >
          <img src={getIconSrc('cart', theme)} alt="cart" className="icon" />
          {!!cart.length && <span className="itemCounter">{cart.length}</span>}
        </Link>
      </div>
    </aside>
  );
};
