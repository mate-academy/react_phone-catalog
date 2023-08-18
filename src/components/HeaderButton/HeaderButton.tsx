import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { HeaderButtonIcon } from '../../types/HeaderButtonIcon';

import { CartStorageContext } from '../../contexts/CartStorageContext';

const returnClassName = ({ isActive }: { isActive: boolean }) => (
  classNames(
    'header-button header__button',
    { 'haeder-button header__button header-button--active': isActive },
  )
);

type Props = {
  type: HeaderButtonIcon;
};

export const HeaderButton: React.FC<Props> = ({ type }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  const cartStorage = useContext(CartStorageContext);

  useEffect(() => {
    const count = (type === HeaderButtonIcon.Favourites)
      ? cartStorage.length
      : cartStorage.reduce(((
        total: number,
        { quantity }: { quantity: number },
      ) => total + quantity), 0);

    setTotalQuantity(count);
  }, [cartStorage]);

  return (
    <NavLink to={`/${type}`} className={returnClassName}>
      <div
        className={classNames(
          'header-button__icon',
          `header-button__icon--${type}`,
        )}
      />

      {!!totalQuantity && (
        <p className="header-button__count">
          {totalQuantity}
        </p>
      )}
    </NavLink>
  );
};
