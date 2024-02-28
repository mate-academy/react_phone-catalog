/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Burger, Icon } from '../../base';
import { MenuNav } from '../MenuNav';
import { HeaderLink } from '../HeaderLink';
import { Search } from '../Search';
import { Logo } from '../Logo';
import { ProductContext } from '../../../context';

import './Header.scss';

const menuItems = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  isShowFav: boolean;
  isShowSearch: boolean;
  location?: string;
};

const MemoHeader: React.FC<Props> = ({ isShowFav, isShowSearch, location }) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
  const { favouriteItems, cartItems } = useContext(ProductContext);

  useEffect(() => {
    if (isOpenedMenu) {
      setIsOpenedMenu(false);
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__content">
          <Link to="/">
            <Logo />
          </Link>
          {/* <Link to="/">LOGO</Link> */}
          <MenuNav
            menuItems={menuItems}
            block="header"
            isOpened={isOpenedMenu}
          />
          <div className="header__actions">
            {isShowSearch && (
              <Search
                placeholder={`Search in ${location}...`}
                className="header__action header__action--search"
              />
            )}
            {isShowFav && (
              <HeaderLink
                to="favorites"
                className="header__action header__action--icon"
              >
                <Icon
                  id="heart"
                  width={16}
                  height={14}
                  counter={favouriteItems.length}
                  className="header__icon header__icon--fav"
                />
              </HeaderLink>
            )}
            <HeaderLink
              to="cart"
              className="header__action header__action--icon"
            >
              <Icon
                id="cart"
                width={14}
                height={14}
                counter={cartItems.length}
                className="header__icon"
              />
            </HeaderLink>
          </div>
          <Burger
            isOpenedMenu={isOpenedMenu}
            openMenu={() => setIsOpenedMenu(isOpened => !isOpened)}
          />
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(MemoHeader);
