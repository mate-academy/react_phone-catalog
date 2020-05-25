import React from 'react';
import { NavLink } from 'react-router-dom';

type NavListProps = {
  list: Link[];
}

export const NavList = ( { list } :NavListProps) => {
  console.log(typeof list)
  return (
   <>
    {list.map(link => (
          <li className="nav_item"
            key={link.title}
          >
            <NavLink to={link.path}
              className="nav_link">
              {link.title}
            </NavLink>
          </li>
        ))}
    </>
  )
}
