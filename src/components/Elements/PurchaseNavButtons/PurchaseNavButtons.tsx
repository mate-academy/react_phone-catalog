import React from 'react';
import { NavLink } from 'react-router-dom';
import './PurchaseNavButtons.scss';

import classNames from 'classnames';
import { useAppContext } from '../../../store/store';

type Props = {
  className?: string;
  handleClick?: () => void;
};

export const PurchaseNavButtons: React.FC<Props> = ({
  className,
  handleClick,
}) => {
  const {
    state: { favourites, cart },
  } = useAppContext();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('button-square', {
      active: isActive,
    });

  return (
    <div className={className ? `purchases ${className}` : 'purchases'}>
      <NavLink
        to={{
          pathname: '/favourites',
        }}
        // state={{ from: location.pathname }}
        className={getLinkClass}
        onClick={handleClick}
      >
        <div className="icon icon--favourite">
          {favourites.length > 0 && (
            <div className="counter">{favourites.length}</div>
          )}
        </div>
      </NavLink>
      <NavLink
        to={{
          pathname: '/cart',
        }}
        // state={{ from: location.pathname }}
        className={getLinkClass}
        onClick={handleClick}
      >
        <div className="icon icon--cart">
          {cart.length > 0 && (
            <div className="counter">
              {cart.reduce((sum, item) => sum + item.count, 0)}
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
};
