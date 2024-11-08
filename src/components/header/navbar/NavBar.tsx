import { FC } from 'react';

import { NavDesktop, NavMobile } from '../index';

export const NavBar: FC = () => {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
};
