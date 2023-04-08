import React, { useMemo } from 'react';
import { HeaderLink } from './HeaderLink';
import { Icon } from './Icon';
import { useLocalstorage } from '../hooks/useLocalstorage';

export const CartLink: React.FC = () => {
  const [cartList] = useLocalstorage('cartList', []);

  const cartsNumber = useMemo(() => cartList.reduce((total, cur) => {
    return total + cur.quantity;
  }, 0), [cartList]);

  return (
    <HeaderLink
      to="/Cart"
      className="header__item"
    >
      <Icon
        cartsNumber={cartsNumber}
        icon="cart"
      />
    </HeaderLink>
  );
};
