import React from 'react';
import { NavLink } from 'react-router-dom';
import { getLinkActiveClass } from '../../helpers/getLinkActiveClass';
import './ActionLink.scss';

type Props = {
  action: 'cart' | 'favorites';
  handleClick?: () => void;
  amount: number;
};

export const ActionLink: React.FC<Props> = ({
  action,
  handleClick,
  amount,
}) => {
  return (
    <NavLink
      to={`/${action}`}
      className={({ isActive }) => getLinkActiveClass(
        'action-link', isActive,
      )}
      onClick={handleClick}
    >
      <div className="action-link__content">
        <div className={`icon icon--${action}`}>
          {!!amount && (
            <div className="action-link__counter">
              {amount}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

ActionLink.defaultProps = {
  handleClick: () => { },
};
