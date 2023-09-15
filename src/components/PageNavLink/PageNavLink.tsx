import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import '../NavBar/NavBar.scss';

type Props = {
  url: string;
  title?: string;
  imagePath?: string;
  counter?: number | null;
};

export const PageNavLink: FC<Props> = ({
  url,
  title,
  imagePath,
  counter,
}) => {
  if (title) {
    return (
      <NavLink
        className={({ isActive }) => classNames(
          'navbar__item',
          'nav-link-style',
          { 'nav-link-active': isActive },
        )}
        to={url}
      >
        {title}
      </NavLink>
    );
  }

  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar__icon',
        { 'has-background-grey-lighter': isActive },
        { 'nav-link-active': isActive },
      )}
      to={url}
    >
      <img src={`${imagePath}`} alt="nav_icon" />

      {counter && (
        <div className="navbar__counter">
          {counter}
        </div>
      )}
    </NavLink>
  );
};

PageNavLink.defaultProps = {
  title: '',
  imagePath: '',
  counter: null,
};
