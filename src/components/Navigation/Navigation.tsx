import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  modifiers?: string;
  itemModifiers?: string;
  onClose?: () => void;
};

export const Navigation: React.FC<Props> = ({
  modifiers = '',
  itemModifiers = '',
  onClose,
}) => {
  const isActiveStyleLinks = ({ isActive }: { isActive: boolean }) =>
    cn(`nav__item ${itemModifiers}`, { 'nav__item--isActive': isActive });

  return (
    <nav className={`nav ${modifiers}`}>
      <div className="nav__list">
        <NavLink to="/" className={isActiveStyleLinks} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="phones" className={isActiveStyleLinks} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="tablets" className={isActiveStyleLinks} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink
          to="accessories"
          className={isActiveStyleLinks}
          onClick={onClose}
        >
          Accessories
        </NavLink>
      </div>
    </nav>
  );
};
