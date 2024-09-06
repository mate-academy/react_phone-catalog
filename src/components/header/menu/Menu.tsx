import { FC } from 'react';

import styles from './menu.module.scss';

import MenuItems from './menu-item/MenuItems';
import { Logo } from 'ui/logo/Logo';

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
