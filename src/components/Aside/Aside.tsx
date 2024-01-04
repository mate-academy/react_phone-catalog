import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Aside.scss';

const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
  classNames('aside__link', {
    'is-active': isActive,
  }));

const menuLinks = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  isVisible: boolean,
  onClick: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Aside: React.FC<Props> = ({ isVisible, onClick }) => {
  return (
    <nav className={`aside${isVisible ? '--visible' : ''}`}>
      <ul className="aside__list">
        {menuLinks.map(link => (
          <li key={link} className="aside__item">
            <NavLink
              onClick={() => onClick(!isVisible)}
              to={link === 'home' ? '/' : link}
              className={getLinkNavClass}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="aside__bg" />
    </nav>
  );
};
