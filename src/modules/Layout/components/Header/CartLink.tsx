import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Icon } from '../../../shared/ui/Icon';
import {
  selectNumberOfItemsInCart,
  useCart,
} from '../../../../app/features/cart';
import classes from './header.module.scss';

type Props = {};

export const CartLink: FC<Props> = () => {
  const [numberOfItemsInCart] = useCart(selectNumberOfItemsInCart);

  return (
    <NavLink
      to={'/asd'}
      className={({ isActive }) =>
        cn(classes.header__iconLink, {
          [classes.header__iconLink_active]: isActive,
        })
      }
      title="Cart"
    >
      <Icon.Wrapper>
        <Icon variant="cart" />
        {Boolean(numberOfItemsInCart) && (
          <Icon.Counter>{numberOfItemsInCart}</Icon.Counter>
        )}
      </Icon.Wrapper>
    </NavLink>
  );
};
