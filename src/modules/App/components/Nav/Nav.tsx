import React from 'react';
import classNames from 'classnames';
import styles from './Nav.module.scss';

import { NavLinkItem } from '@components/NavLinkItem';

import { LINKS } from '@App/constants/Links';

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className }) => {
  return (
    <nav className={classNames(className, styles.nav)}>
      <ul className={styles.nav__items}>
        {LINKS.map(link => (
          <li key={link[0]}>
            <NavLinkItem to={link[0]}>{link[1]}</NavLinkItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};
