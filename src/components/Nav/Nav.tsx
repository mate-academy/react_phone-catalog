
import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { Link } from '../../interfaces';
import {Logo} from '../Logo/Logo';

export const Nav = ({ links }: { links: Link[] }) => {
  return (
    <nav className="Nav" >
      <ul className="Nav__list">
        <li className="Nav__item">
          <Logo />
        </li>
        {links.map(link => {
          const { address, title, isOuter } = link;
          return (
            <li className="Nav__item">
              <label className="Nav__label">
                {isOuter
                  ? <a className="Nav__link" target="_blank" href={address}>{title}</a>
                  : <NavLink className="Nav__link" to={address}>{title}</NavLink>}

              </label>
            </li>
          )
        })}
      </ul>
    </nav>

  )
}

