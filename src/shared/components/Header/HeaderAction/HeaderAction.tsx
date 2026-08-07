import classNames from 'classnames';

import React from 'react';
import styles from './HeaderAction.module.scss';
import { NavLink } from 'react-router-dom';
import { ComponentType, SVGProps } from 'react';

type Props = {
  to: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  isMobile?: boolean;
  count?: number;
};

export const HeaderAction: React.FC<Props> = ({
  to,
  Icon,
  isMobile = false,
  count,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      classNames(styles.headerAction, {
        [styles.isActive]: isActive,
        [styles.headerActionMobile]: isMobile,
      })
    }
  >
    <Icon className={styles.icon} />

    {count && count > 0 ? <span className={styles.badge}>{count}</span> : null}
  </NavLink>
);
