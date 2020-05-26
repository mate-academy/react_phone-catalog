import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';

import './NavSliding.scss';
import { Icon } from '../Icon';
import { FavoritesContext } from '../Favorites';
import { SECTION_LINK, FOOTER_LINKS } from '../../helpers';

export const NavSliding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useContext(FavoritesContext);

  const handleNavSliding = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="NavSliding">
      <button
        type="button"
        className={cn('NavSliding__Button', { 'NavSliding__Button--cross': isOpen })}
        onClick={handleNavSliding}
      >
        <span className="NavSliding__ButtonLine" />
        <span className="NavSliding__ButtonLine" />
      </button>
      <section className={cn('NavSliding__Block', { show: isOpen })}>
        <div className="NavSliding__Illustration" />
        <div className="NavSliding__Content">
          <ul className="NavSliding__List--secondary">
            <li className="NavSliding__Item--secondary">
              <Link to="/favorites" className="NavSliding__Icon">
                <Icon
                  name="favorites"
                  tag={favorites.length}
                  border={false}
                  inActive={false}
                />
              </Link>
            </li>
            <li className="NavSliding__Item--secondary">
              <Link to="/cart" className="NavSliding__Icon">
                <Icon
                  name="shopping-bag"
                  border={false}
                  inActive={false}
                />
              </Link>
            </li>
          </ul>
          <ul className="NavSliding__List">
            <li className="NavSliding__Item">
              <NavLink
                to="/"
                exact
                className="NavSliding__Link NavSliding__Link--primary"
                activeClassName="Nav__Link--active"
              >
                Home
              </NavLink>
            </li>
            {SECTION_LINK.map(({ name, url, exact }) => (
              <li className="NavSliding__Item" key={name}>
                <NavLink
                  to={url}
                  exact={exact}
                  className="NavSliding__Link NavSliding__Link--primary"
                  activeClassName="NavSliding__Link--active"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="NavSliding__List--secondary">
            {FOOTER_LINKS.map(({ name, url }) => (
              <li className="NavSliding__Item--secondary" key={name}>
                <NavLink
                  to={url}
                  className="NavSliding__Link NavSliding__Link--secondary"
                  activeClassName="NavSliding__Link--active"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </nav>
  );
};
