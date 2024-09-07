import { FC } from 'react';

import styles from './menu.module.scss';

<<<<<<< HEAD
import { Logo } from '@ui/logo/Logo';
import MenuItems from './menu-item/MenuItems';
=======
import MenuItems from './menu-item/MenuItems';
import { Logo } from 'ui/logo/Logo';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

import { menu } from './menu.data';

export const Menu: FC = () => {
  return (
    <>
      <Logo />

      <ul className={styles.links}>
        {menu.map(item => (
          <MenuItems key={item.name} item={item} />
        ))}
      </ul>
    </>
  );
};
