import { FC } from 'react';
import { Menu } from '../Menu';

import classNames from 'classnames';
import styles from './Sidebar.module.scss';

interface Props {
  isActive: boolean;
}

export const Sidebar: FC<Props> = ({ isActive }) => {
  return (
    <aside
      className={classNames(styles.sidebar, {
        [styles.sidebarActive]: isActive,
      })}
    >
      <Menu />
    </aside>
  );
};
