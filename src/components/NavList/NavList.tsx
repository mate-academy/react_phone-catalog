import React from 'react';

type NavListProps = {
  list: Link[];
}

export const NavList = ( { list } :NavListProps) => {

  return (
   <>
    {list.map(link => (
          <li className="nav_item"
            key={link.title}
          >
            <a href={link.path} className="nav_link">
              {link.title}
            </a>
          </li>
        ))}
    </>
  )
}


/*<NavLink to={link.path}
              className="nav_link">
                {link.title}
            </NavLink>
*/
