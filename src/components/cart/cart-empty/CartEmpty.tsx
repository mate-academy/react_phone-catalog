import { FC } from 'react';

import cartEmpty from '/img/cart/cart-is-empty.png';

const style = {
  display: 'block',
  marginInline: 'auto',
};

export const CartEmpty: FC = () => (
  <img src={cartEmpty} alt="Cart is empty" style={style} />
);
