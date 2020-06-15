import React from 'react';

type NavListProps = {
  list: Link[];
}

export const NavList = ( { list } :NavListProps) => {

  return (
   <>
    {list.map(link => (
          <li className="nav__item"
            key={link.title}
          >
            <a href={link.path} className="nav__link">
              {link.title}
            </a>
          </li>
        ))}
    </>
  )
}

