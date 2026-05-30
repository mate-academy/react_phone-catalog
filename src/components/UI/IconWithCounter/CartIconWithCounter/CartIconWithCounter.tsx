/* eslint-disable max-len */
import React from 'react';
import styles from './CartIconWithCounter.module.scss';
import { NavLink } from 'react-router-dom';
import { IconWithCounter } from '../IconWithCounter';
import cn from 'classnames';

type Props = {
  cartCount?: number;
  isMobile?: boolean;
  onClick?: () => void;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navbar__cart, {
    [styles.navbar__cart_active]: isActive,
  });

export const CartIconWithCounter: React.FC<Props> = ({
  cartCount,
  isMobile = false,
  onClick,
}) => {
  return (
    <NavLink
      to="/cart"
      onClick={onClick}
      className={({ isActive }) =>
        cn(getLinkClass({ isActive }), {
          [styles.mobile]: isMobile,
        })
      }
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.navbar__counterIcon}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.46683 6.93332C9.59273 6.76545 9.79032 6.66666 10.0002 6.66666H18.0002C18.21 6.66666 18.4076 6.76545 18.5335 6.93332L20.5335 9.59999C20.62 9.71539 20.6668 9.85574 20.6668 9.99999V19.3333C20.6668 19.8638 20.4561 20.3725 20.081 20.7475C19.706 21.1226 19.1973 21.3333 18.6668 21.3333H9.3335C8.80306 21.3333 8.29436 21.1226 7.91928 20.7475C7.54421 20.3725 7.3335 19.8638 7.3335 19.3333V9.99999C7.3335 9.85574 7.38028 9.71539 7.46683 9.59999L9.46683 6.93332ZM10.3335 7.99999L8.66683 10.2222V19.3333C8.66683 19.5101 8.73707 19.6797 8.86209 19.8047C8.98712 19.9298 9.15669 20 9.3335 20H18.6668C18.8436 20 19.0132 19.9298 19.1382 19.8047C19.2633 19.6797 19.3335 19.5101 19.3335 19.3333V10.2222L17.6668 7.99999H10.3335Z"
          fill="#F1F2F9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.3335 10C7.3335 9.63182 7.63197 9.33334 8.00016 9.33334H20.0002C20.3684 9.33334 20.6668 9.63182 20.6668 10C20.6668 10.3682 20.3684 10.6667 20.0002 10.6667H8.00016C7.63197 10.6667 7.3335 10.3682 7.3335 10Z"
          fill="#F1F2F9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.3337 12C11.7018 12 12.0003 12.2985 12.0003 12.6667C12.0003 13.1971 12.211 13.7058 12.5861 14.0809C12.9612 14.456 13.4699 14.6667 14.0003 14.6667C14.5308 14.6667 15.0395 14.456 15.4145 14.0809C15.7896 13.7058 16.0003 13.1971 16.0003 12.6667C16.0003 12.2985 16.2988 12 16.667 12C17.0352 12 17.3337 12.2985 17.3337 12.6667C17.3337 13.5507 16.9825 14.3986 16.3573 15.0237C15.7322 15.6488 14.8844 16 14.0003 16C13.1163 16 12.2684 15.6488 11.6433 15.0237C11.0182 14.3986 10.667 13.5507 10.667 12.6667C10.667 12.2985 10.9655 12 11.3337 12Z"
          fill="#F1F2F9"
        />
        {(cartCount || 0) > 0 && <IconWithCounter count={cartCount} />}
      </svg>
    </NavLink>
  );
};
