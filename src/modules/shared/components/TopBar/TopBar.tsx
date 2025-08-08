import { Icon } from '../Icon';
import { Navbar } from '../Navbar';
import topBarStyle from './TopBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IconEnum } from '../../../../types/iconsType';
import { Menu } from '../Menu';
import { useContext, useEffect, useState } from 'react';
import { PagesType } from '../../../../types/PagesType';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import { CartContext } from '../../../../context/CartContext';

export const TopBar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { favProducts } = useContext(FavoritesContext);
  const { cartProducts } = useContext(CartContext);
  const getBurgerName = !isActive ? IconEnum.burger : IconEnum.close;

  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);

  return (
    <>
      <div className={topBarStyle['top-bar']}>
        <div className={topBarStyle['top-bar__nav']}>
          <Link
            className={topBarStyle['top-bar__logo-link']}
            to={PagesType.home}
          >
            <img
              src="public/img/Logo.png"
              className={topBarStyle['top-bar__logo-img']}
              alt="Nice gadget logo"
            />
          </Link>
          <Navbar onLinkClick={() => setIsActive(false)} />
        </div>
        <div className={topBarStyle['top-bar__icons']}>
          <Icon
            count={cartProducts.length}
            iconName={IconEnum.cart}
            href={`/${IconEnum.cart}`}
            key={IconEnum.cart}
          />
          <Icon
            count={favProducts.length}
            iconName={IconEnum.favorites}
            href={`/${IconEnum.favorites}`}
            key={IconEnum.favorites}
          />
          <Icon
            iconName={getBurgerName}
            key={getBurgerName}
            onActive={setIsActive}
          />
        </div>
      </div>

      <Menu isActive={isActive} />
    </>
  );
};
