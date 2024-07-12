import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { GlobalContext } from '../../GlobalContext';
import { Icon } from '../Icon';
import { IconList } from '../Icon/styles/IconList';

import classes from './Cart.module.scss';

type Props = {
  onClick?: () => void;
};

export const Cart: React.FC<Props> = ({ onClick }) => {
  const { cart } = useContext(GlobalContext);

  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames([classes.Cart], { [classes.active]: isActive });
  };

  return (
    <NavLink className={activeClass} to="/cart">
      <button type="button" onClick={onClick}>
        <Icon icon={IconList.cart} counter={cart.length} />
      </button>
    </NavLink>
  );
};
