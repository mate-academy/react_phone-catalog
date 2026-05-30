import React from 'react';
import cn from 'classnames';

import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import logoLight from '@assets/images/logo.png';
import logoDark from '@assets/images/logo-dark.png';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  isBig?: boolean;
};

export const Logo: React.FC<Props> = ({ isBig = false }) => {
  const isDark = useTheme();

  return (
    <Link to="/" className={styles.logo}>
      <img
        src={isDark ? logoDark : logoLight}
        alt="Nice Gadgets logo"
        className={cn(styles.logo__img, {
          [styles['logo__img--big']]: isBig,
        })}
      />
    </Link>
  );
};
