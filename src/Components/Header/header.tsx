import React from 'react';
import { TopBar } from '../TopBar/TopBar';

type Props = {
  cartItemsCount: number;
  favouritesCount: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({
  cartItemsCount,
  favouritesCount,
  setMenuOpen,
}) => {
  // debug: verify props received by Header
  // eslint-disable-next-line no-console
  console.debug('Header props:', { cartItemsCount, favouritesCount });

  return (
    <header id="top" className="header">
      <div className="header__container">
        <TopBar
          cartItemsCount={cartItemsCount}
          favouritesCount={favouritesCount}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </header>
  );
};
