import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBasket } from '../../store/index';
import { useWindowSize } from '../../helpers/useWindowSize';
import { NavList } from './NavList';
import { BurgerButton } from './BurgerButton';

export const Navigation: React.FC = () => {
  const numberInTheBasket = useSelector(getBasket).length;
  const width = useWindowSize();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [visibleBurger, setVisibleBurger] = useState(false);
  const [translate, setTranslate] = useState('-400');

  const handleClick = () => {
    const tempTranslate = visibleBurger ? '-400' : '0';

    setTranslate(tempTranslate);
    setVisibleBurger(!visibleBurger);
  };

  const handleClickOnLink = () => {
    setTranslate('-400');
    setVisibleBurger(false);
  };

  useEffect(() => {
    if (+width < 800) {
      setBurgerMenu(true);
    } else {
      setBurgerMenu(false);
      setVisibleBurger(false);
      setTranslate('-400');
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
