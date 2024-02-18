import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './SavedItemsButton.scss';

type ButtonType = 'favs' | 'cart';

type Props = {
  type: ButtonType;
};

export const SavedItemsButton: React.FC<Props> = ({ type }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('SavedItemsButton', `SavedItemsButton--${type}`, {
      'SavedItemsButton--selected': isActive,
    });

  return (
    <div className="SavedItemsButton-container">
      <NavLink to="/" className={getLinkClass}>
        <div className="SavedItemsButton__amount">0</div>
      </NavLink>
    </div>
  );
};
