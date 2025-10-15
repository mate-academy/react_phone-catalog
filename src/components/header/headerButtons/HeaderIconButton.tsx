import React from 'react';

const iconToPath = {
  heart: '../../../public/img/general/icons/heart.svg',
  cart: '../../../public/img/general/icons/cart.svg',
};

type Props = {
  count: number;
  icon: 'heart' | 'cart';
};

export const HeaderIconButton: React.FC<Props> = ({ count, icon }) => {
  const displayCount = count > 99 ? '99+' : count;
  const className =
    icon === 'heart'
      ? 'header__button likes-button'
      : 'header__button cart-button';

  return (
    <button className={className}>
      <img className="header__icon" alt={icon} src={iconToPath[icon]} />
      {count > 0 && <span className="header__link-button">{displayCount}</span>}
    </button>
  );
};
