import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCATIONS } from '../../common/constants';

export const Cart = ({headerItemRef}: CartProps) => {
  const location = useLocation();

  const refCheck = useMemo(
    () => location.pathname === LOCATIONS.cart ? headerItemRef : null,
    [location.pathname, headerItemRef]
  );

  return (
    <div className="cart">
      <Link
        to="/"
        ref={refCheck}
        className="cart__button"
      />
    </div>
  );
};
