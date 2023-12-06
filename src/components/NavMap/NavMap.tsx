import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';

import './NavMap.scss';

export const NavMap = () => {
  const path = window.location.hash;
  const links = path.split('/')[1].split('?')[0].split('/');
  // const links = ['phones', 'apple-iphone-14-pro-128gb-gold'];

  const nameLinks = links.map(link => {
    const linkWords = link.split('-');

    if (linkWords.length !== 0) {
      return linkWords.map(linkWord => (
        linkWord.charAt(0).toUpperCase() + linkWord.slice(1)
      )).join(' ');
    }

    return link.charAt(0).toUpperCase() + link.slice(1);
  });

  return (
    <nav className="nav-map">
      <NavLink
        className="nav-map__link"
        to="/"
      >
        <div className="icon icon__home" />
      </NavLink>

      {links.map((link, index) => (
        <React.Fragment key={getUniqueId()}>
          <div
            className="icon icon__arrow-secondary icon__arrow-secondary--rigth"
          />
          {index !== links.length - 1 ? (
            <NavLink
              className="nav-map__link"
              to={`/${link}`}
              key={getUniqueId()}
            >
              {nameLinks[index]}
            </NavLink>
          ) : (
            <p
              className="nav-map__label"
              key={getUniqueId()}
            >
              {nameLinks[index]}
            </p>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
