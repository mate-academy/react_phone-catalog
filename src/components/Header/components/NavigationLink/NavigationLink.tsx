//#region imports
import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationLink.module.scss';
//#endregion

type Props = {
  to: string;
  count: number;
  children: ReactNode;
};

export const NavigationLink: FC<Props> = ({ to, children, count }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, {
      [styles.active]: isActive,
    });

  return (
    <NavLink to={to} className={getNavLinkClass}>
      <div className={styles.iconWithCounter}>
        {children}

        {!!count && <div className={styles.counter}>{count}</div>}
      </div>
    </NavLink>
  );
};
