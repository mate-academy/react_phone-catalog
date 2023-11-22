import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Counter } from '../Counter/Counter';
import { useAppSelector } from '../../app/hooks';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { calculateCartTotal } from '../../helpers/calculateCartTotal';

export const Cart: FC = () => {
  const { isMobile, setIsMenuClicked } = useContext(PhoneCatalogContext);
  const { cartItems } = useAppSelector(store => store.cart);

  const navLinkClassName = !isMobile
    ? ({ isActive }: { isActive: boolean }) => classNames(
      'header__top-actions header__top-actions--cart',
      {
        'header__top-actions--active': isActive,
      },
    )
    : 'menu-mobile__icon';

  const handleClick = () => {
    if (setIsMenuClicked) {
      setIsMenuClicked(false);
    }
  };

  return (
    <NavLink
      to="/cart"
      className={navLinkClassName}
      onClick={handleClick}
    >
      <Icon type="cart" />
      <Counter quantity={calculateCartTotal(cartItems, 'quantity')} />
    </NavLink>
  );
};
