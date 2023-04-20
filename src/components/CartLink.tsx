import React, { useContext, useMemo } from 'react';
import { HeaderLink } from './HeaderLink';
import { Icon } from './Icon';
import { ProductsContext } from '../context/ProductsContext';

export const CartLink: React.FC = () => {
  const { cartList } = useContext(ProductsContext);

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
