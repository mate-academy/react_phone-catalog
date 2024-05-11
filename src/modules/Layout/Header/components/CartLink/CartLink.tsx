import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Icon } from '../../../../shared/ui/Icon';

type Props = Exclude<NavLinkProps, 'children'>;

export const CartLink: FC<Props> = props => {
  const numberOfItemsInCart = 5;

  return (
    <NavLink {...props} title="Cart">
      <Icon.Wrapper>
        <Icon variant="cart" />
        {numberOfItemsInCart && (
          <Icon.Counter>{numberOfItemsInCart}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
