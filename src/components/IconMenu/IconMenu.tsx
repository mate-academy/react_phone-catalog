import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PathnamesApp } from '../../types/Pathnames';
import './iconMenu.scss';

type Props = {
  count: number,
  link: PathnamesApp,
  iconName: string,
};

export const IconMenu: React.FC<Props> = ({
  count,
  link,
  iconName,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => classNames(
        'icon',
        { selected: isActive },
      )}
    >
      <div className={`icon__img icon__img_${iconName}`} />
      {count > 0 && (
        <div className="icon__count">
          <span className="icon__text">
            {count}
          </span>
        </div>
      )}
    </NavLink>
  );
};
