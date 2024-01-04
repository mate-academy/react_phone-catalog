import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { useAppSelector } from '../../store/hooks';
import { Aside } from '../Aside/Aside';

export const Header: React.FC = () => {
  const cartedProducts = useAppSelector(state => state.cartedProducts);
  const favouriteProducts = useAppSelector(state => state.favouriteProducts);
  const { pathname } = useLocation();
  const curPage = pathname.split('/')[1];
  const pages = 'phones'
  || 'tablets'
  || 'accessories'
  || 'favorites';
  const shouldSearch = pathname.endsWith(pages);

  const headerLinks = ['home', 'phones', 'tablets', 'accessories'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="header" id="top">
      <div className="header__content">
        <div className="header__left">
          <Link className="header__logo" to="/" />

          <div className="header__navBar">
            <NavBar links={headerLinks} />
          </div>

          <div className="header__icon">
            <ButtonIcon
              type="event"
              shape="menu"
              path="menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              dynamicClasses={['shadow', 'big']}
            />
          </div>
        </div>

        <div className="header__icons">
          <div className="header__search">
            {shouldSearch && (<Search page={curPage} />)}
          </div>

          <div className="header__link">
            <ButtonIcon
              type="link"
              shape="heart"
              path="favourites"
              dynamicClasses={['shadow', 'big']}
            />

            {favouriteProducts.length > 0 && (
              <div className="header__counter">
                {favouriteProducts.length}
              </div>
            )}
          </div>

          <div className="header__link">
            <ButtonIcon
              type="link"
              shape="cart"
              path="cart"
              dynamicClasses={['shadow', 'big']}
            />

            {cartedProducts.length > 0 && (
              <div className="header__counter">{cartedProducts.length}</div>
            )}
          </div>
        </div>
      </div>

      <Aside isVisible={isMenuOpen} onClick={setIsMenuOpen} />
    </header>
  );
};
