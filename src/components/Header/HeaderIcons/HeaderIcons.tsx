import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { headerIcons } from '../../../variables/headerIcons';

export const HeaderIcons = () => {
  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return cn('header__icon', { 'header__icon--active': isActive });
  };

  return (
    <div className="header__icons">
      {headerIcons.map((icon) => (
        <NavLink to={icon.path} className={setActiveClass} key={icon.id}>
          <div className="header__imgs">
            {icon.counter > 0 && (
              <span className="header__counter">{icon.counter}</span>
            )}
            <img
              className="header__img"
              src={icon.icon}
              alt="header-icon"
              loading="lazy"
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
};
