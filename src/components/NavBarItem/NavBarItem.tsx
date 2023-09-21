import '../../styles/components/NavBarItem/NavBarItem.scss';

import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import { Counter } from '../Counter';

type Props = NavLinkProps & {
  type: 'text' | 'fav' | 'cart';
  cartLengh?: number,
  favLengh?: number,
};

export const NavBarItem: React.FC<Props> = ({
  type,
  cartLengh,
  favLengh,
  children,
  ...props
}) => {
  const counterValue = favLengh || cartLengh || 0;

  return (
    <NavLink
      {...props}
      className={({ isActive }) => classNames('nav-item', `nav-item-${type}`, {
        'is-active': isActive,
      })}
    >
      <div className="nav-item__counter">
        <Counter quantity={counterValue} />
      </div>
      {children}
    </NavLink>
  );
};
