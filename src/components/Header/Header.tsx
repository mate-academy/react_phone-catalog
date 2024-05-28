import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

import {NavBar} from "./NavBar/NavBar";

import {BurgerMenu} from "./BurgerMenu/BurgerMenu";
import {UserLinksGroup} from "./UserLinksGroup/UserLinksGroup";
import {useMediaQuery} from "react-responsive";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {pathname} = useLocation();

  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="header__nav-bar">
          <NavLink
            to="/"
            className="header__logo-link"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={`/img/header/Orange_logo.svg`}
              alt="NG_logo"
              className="header__logo-img"
            />
          </NavLink>

          {isTablet && <NavBar />}
        </div>

        <div className="header__nav-bar-right">
          {isTablet && <UserLinksGroup />}

          {!isOpen && !isTablet && (
            <span
              className="header__custom-links-mob"
              onClick={() => setIsOpen(true)}
            >
              <img
                className="header__burger-img"
                src={`/img/header/burger.svg`}
                alt=""
              />
            </span>
          )}

          {isOpen && !isTablet && (
            <span
              className="header__custom-links-mob"
              onClick={() => setIsOpen(false)}
            >
              <img
                className="header__cross-img"
                src={`/img/header/cross.svg`}
                alt=""
              />
            </span>
          )}
        </div>
      </header>

      {!isTablet && <BurgerMenu isOpen={isOpen} />}
    </>
  );
};
