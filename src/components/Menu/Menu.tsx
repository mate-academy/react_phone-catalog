import React, { useContext } from 'react';
import './Menu.scss';
import { CSSTransition } from 'react-transition-group';
import { Nav } from '../Nav';
import { Favorites } from '../Favorites';
import { Cart } from '../Cart';
import { MenuButton } from '../MenuButton/MenuButton';
import { MenuContext } from '../../helpers/utils/menuContext';

type Props = {};

export const Menu: React.FC<Props> = () => {
  const { hasMenu } = useContext(MenuContext);

  return (
    <CSSTransition
      in={hasMenu}
      timeout={300}
      unmountOnExit
      classNames="CSSTransition-menu"
    >
      <section className="menu">
        <div className="container">
          <div className="menu__content">
            <MenuButton />

            <Nav />

            <div className="menu__fav-cart">
              <Favorites />
              <Cart />
            </div>
          </div>
        </div>
      </section>
    </CSSTransition>
  );
};
