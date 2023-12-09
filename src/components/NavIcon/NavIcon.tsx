import './NavIcon.scss';
import React, { memo } from 'react';

type Props = {
  itemsLength?: number;
};

export const NavIcon: React.FC<Props> = memo(({
  children, itemsLength = 0,
}) => (
  <div className="nav-icon__box">
    <div className="nav-icon__container">
      {children}

      {itemsLength > 0 && (
        <div className="nav-icon__counter">
          {itemsLength}
        </div>
      )}
    </div>
  </div>
));
