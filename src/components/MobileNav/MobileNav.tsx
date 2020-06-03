
import './MobileNav.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { LinkType } from '../../interfaces';


export const MobileNav = ({ links, isVisible }: { links: LinkType[]; isVisible: boolean }) => {

  return (
    <nav className={
      isVisible
      ? "MobileNav"
      : "MobileNav MobileNav--invisible"
    }
     >
      <ul className="MobileNav__list">
        {links.map(link => {
          const { address, title, isOuter } = link;
          return (
            <li
              key={address + title + isOuter}
              className="MobileNav__item">
              <label className="MobileNav__label">
                {isOuter
                  ? <a className="MobileNav__link" href={address}>{title}</a>
                  : <NavLink
                    className="MobileNav__link"
                    exact
                    to={address}>{title}</NavLink>}

              </label>
            </li>
          )
        })}
      </ul>
    </nav>
  )



}

