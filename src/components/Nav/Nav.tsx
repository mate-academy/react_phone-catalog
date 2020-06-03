
import React from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { LinkType } from '../../interfaces';


export const Nav = ({ links, addresses }: { links: LinkType[]; addresses: string[] }) => {
  const location = useLocation();
  const isOnPage = !addresses.includes(location.pathname)

  return (
    isOnPage
      ? <nav className="Nav" >
        <ul className="Nav__list">
          {links.map(link => {
            const { address, title, isOuter } = link;
            return (
              <li
                key={address + title + isOuter}
                className="Nav__item">
                <label className="Nav__label">
                  {isOuter
                    ? <a className="Nav__link" href={address}>{title}</a>
                    : <NavLink
                      className="Nav__link"
                      exact
                      to={address}>{title}</NavLink>}

                </label>
              </li>
            )
          })}
        </ul>
      </nav>
      : <span></span>
  )
}

