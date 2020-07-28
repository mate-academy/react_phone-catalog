import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBasket, getFavorite } from '../../store/index';
import { useWindowSize } from '../../helpers/useWindowSize';
import { NavList } from './NavList';
import { BurgerButton } from './BurgerButton';

export const Navigation: React.FC = () => {
  const numberInTheBasket = useSelector(getBasket).length;
  const numberFavorite = useSelector(getFavorite).length;
  const width = useWindowSize();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [visibleBurger, setVisibleBurger] = useState(false);
  const [translate, setTranslate] = useState('-1000');

  const handleClick = () => {
    const tempTranslate = visibleBurger ? '-1000' : '65';

    setTranslate(tempTranslate);
    setVisibleBurger(!visibleBurger);
  };

  const handleClickOnLink = () => {
    setTranslate('-1000');
    setVisibleBurger(false);
  };

  useEffect(() => {
    setVisibleBurger(false);
    if (+width < 800) {
      setBurgerMenu(true);
    } else {
      setBurgerMenu(false);
      setTranslate('-1000');
    }
  }, [width]);

  return (
    <>
      <nav className="nav">
        {
          !burgerMenu
            ? <NavList burgerMenu={burgerMenu} />
            : <BurgerButton handleClick={handleClick} />
        }
        <span>
          <NavLink className="fontMonte nav__special-link" to="/favorite/" exact onClick={handleClickOnLink}>
            <img src="img/images/favorite.svg" alt="favorite" />
            <span className="red">
              {numberFavorite !== 0 && `${numberFavorite}`}
            </span>
          </NavLink>
          <NavLink className="fontMonte nav__special-link" to="/basket/" exact onClick={handleClickOnLink}>
            <img src="img/images/basket.png" alt="basket" />
            <span className="red">
              {numberInTheBasket !== 0 && `${numberInTheBasket}`}
            </span>
          </NavLink>
        </span>
      </nav>
      {
        burgerMenu && (
          <NavList
            translate={translate}
            handleClickOnLink={handleClickOnLink}
            burgerMenu={burgerMenu}
          />
        )
      }
    </>
  );
};
