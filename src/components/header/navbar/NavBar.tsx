import { FC } from 'react';

import { NavDesktop } from '../nav-desktop/NavDesktop';
import { NavMobile } from '../nav-mobile/NavMobile';

export const NavBar: FC = () => {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
};
