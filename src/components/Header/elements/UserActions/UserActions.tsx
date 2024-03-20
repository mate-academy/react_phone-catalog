import { NavLink } from 'react-router-dom';
import './UserActions.scss';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('user-actions__icon', {
    'link-active': isActive,
  });

export const UserActions = () => {
  return (
    <div className="user-actions">
      <NavLink to="/favourites" className={getLinkClass}>
        <img src="img/icons/heart.svg" alt="Favourites" />
      </NavLink>

      <NavLink to="/cart" className={getLinkClass}>
        <img src="img/icons/cart.svg" alt="Cart" />
      </NavLink>
    </div>
  );
};
