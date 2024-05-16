import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Icon } from '../../../../shared/ui/Icon';
import {
  selectNumberOfItemsInCart,
  useCart,
} from '../../../../../app/features/cart';

type Props = Exclude<NavLinkProps, 'children'>;

export const CartLink: FC<Props> = props => {
  const [numberOfItemsInCart] = useCart(selectNumberOfItemsInCart);

  return (
    <NavLink {...props} title="Cart">
      <Icon.Wrapper>
        <Icon variant="cart" />
        {Boolean(numberOfItemsInCart) && (
          <Icon.Counter>{numberOfItemsInCart}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
