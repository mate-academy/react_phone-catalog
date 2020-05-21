
import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { Link } from '../../interfaces';

export const Nav = ({ links }: { links: Link[] }) => {
  return (
    <nav className="Nav" >
      <ul className="Nav__list">
        {links.map(link => {
          const { address, title, isOuter } = link;
          return (
            <li>
              <label className="Nav__link">
                {isOuter
                  ? <a target="_blank" href={address}>{title}</a>
                  : <NavLink to={address}>{title}</NavLink>}

              </label>
            </li>
          )
        })}
      </ul>
    </nav>

  )
}

