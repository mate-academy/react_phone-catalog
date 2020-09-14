import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBasket, getFavorite, getIsVerified } from '../../store/index';
import { useWindowSize } from '../../helpers/useWindowSize';
import { NavList } from './NavList';
import { BurgerButton } from './BurgerButton';
import { LoginForm } from '../LoginForm';
import { userLogout } from '../../helpers/login';

export const Navigation: React.FC = () => {
  const numberInTheBasket = useSelector(getBasket).length;
  const numberFavorite = useSelector(getFavorite).length;
  const width = useWindowSize();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [visibleBurger, setVisibleBurger] = useState(false);
  const [translate, setTranslate] = useState('-1000');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isVerified = useSelector(getIsVerified);

  const handleClick = () => {
    const tempTranslate = visibleBurger ? '-1000' : '65';

    setTranslate(tempTranslate);
    setVisibleBurger(!visibleBurger);
  };

  const handleClickOnLink = () => {
    setTranslate('-1000');
    setVisibleBurger(false);
  };

  const hideModal = () => {
    setIsModalVisible(false);
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

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    localStorage.removeItem('token');
    userLogout(token);
  };

  return (
    <>
      <nav className="nav">
        {
          !burgerMenu
            ? <NavList burgerMenu={burgerMenu} />
            : <BurgerButton handleClick={handleClick} />
        }
        {
          !isVerified
            ? (
              <button className="nav__button" type="button" onClick={() => setIsModalVisible(true)}>
                <img className="nav__button-img" src="img/images/enter.png" alt="enter" />
              </button>
            )
            : (
              <div className="nav__box">
                <NavLink className="fontMonte nav__special-link" to="/favorite/" exact onClick={handleClickOnLink}>
                  <img src="img/images/favorite.svg" alt="favorite" />
                  <span className={(numberFavorite !== 0) ? 'red' : 'white'}>
                    {numberFavorite !== 0 && `${numberFavorite}`}
                  </span>
                </NavLink>
                <NavLink className="fontMonte nav__special-link" to="/basket/" exact onClick={handleClickOnLink}>
                  <img src="img/images/basket.png" alt="basket" />
                  <span className={(numberInTheBasket !== 0) ? 'red' : 'white'}>
                    {numberInTheBasket !== 0 && `${numberInTheBasket}`}
                  </span>
                </NavLink>
                <button
                  className="nav__button"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  <img
                    className="nav__button-img"
                    src="img/images/logout.png"
                    alt="logout"
                    title="logout"
                  />
                </button>
              </div>
            )
        }
      </nav>
      {
        isModalVisible && <LoginForm hideModal={hideModal} />
      }
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
