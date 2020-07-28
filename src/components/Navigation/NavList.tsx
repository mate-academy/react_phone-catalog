import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  translate?: string;
  handleClickOnLink?: () => (void);
  burgerMenu: boolean;

}

export const NavList: React.FC<Props> = ({
  translate, handleClickOnLink, burgerMenu,
}) => {
  const classOfNav = burgerMenu ? 'burger-menu' : 'nav';

  return (
    <ul className={`${classOfNav}__list`} style={{ transform: `translateY(${translate}px)` }}>
      <li className={`${classOfNav}__item`}>
        <NavLink className={`${classOfNav}__link`} to="/" exact onClick={handleClickOnLink}>
          home
        </NavLink>
      </li>
      <li className={`${classOfNav}__item`}>
        <NavLink className={`${classOfNav}__link`} to="/phones/" onClick={handleClickOnLink}>
          phones
        </NavLink>
      </li>
      <li className={`${classOfNav}__item`}>
        <NavLink className={`${classOfNav}__link`} to="/tablets/" onClick={handleClickOnLink}>
          tablets
        </NavLink>
      </li>
      <li className={`${classOfNav}__item`}>
        <NavLink className={`${classOfNav}__link`} to="/accessories/" onClick={handleClickOnLink}>
          accessories
        </NavLink>
      </li>
      {
        classOfNav === 'burger-menu' && (
          <>
            <li className={`${classOfNav}__item`}>
              <a className="fontMonte nav__link" href="https://github.com/liliya-dev">
                Github
              </a>
            </li>
            <li className={`${classOfNav}__item`}>
              <NavLink className="fontMonte nav__link" to="/contacts/">
                Contacts
              </NavLink>
            </li>
            <li className={`${classOfNav}__item`}>
              <NavLink className="fontMonte nav__link" to="/rights/">
                Rights
              </NavLink>
            </li>
          </>
        )
      }
    </ul>
  );
};
