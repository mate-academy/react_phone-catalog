// import '../../_index.scss';
import React, { useContext, useEffect } from 'react';
import menu from './menu.module.scss';
import { Navbar } from '../Navbar';
import { NavVariants } from '../../../../types/NavVariants';
import { Icon } from '../Icon';
import { IconEnum } from '../../../../types/iconsType';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import { CartContext } from '../../../../context/CartContext';

type Props = {
  isActive: boolean;
};

export const Menu: React.FC<Props> = ({ isActive }) => {
  const { favProducts } = useContext(FavoritesContext);
  const { cartProducts } = useContext(CartContext);

  const isActiveMenu = () => {
    return isActive ? `${menu.menu} ${menu['menu--active']}` : `${menu.menu}`;
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  return (
    <aside id="menu" className={isActiveMenu()}>
      <div className={`${menu.menu__content} container`}>
        <Navbar key={'menu'} variant={NavVariants.menu} />
      </div>
      <div className="manu__footer">
        <Icon
          count={cartProducts.length}
          iconName={IconEnum.cart}
          href={`/${IconEnum.cart}`}
          variant={NavVariants.menu}
          key={IconEnum.cart}
        />
        <Icon
          count={favProducts.length}
          iconName={IconEnum.favorites}
          href={`/${IconEnum.favorites}`}
          variant={NavVariants.menu}
          key={IconEnum.favorites}
        />
      </div>
    </aside>
  );
};
