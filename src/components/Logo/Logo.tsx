import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ThemeType } from '../../types';
import { useTheme } from '../../hooks';

import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';

import styles from './Logo.module.scss';

type Props = {
  className?: string;
  onClick?: () => void;
};

export const Logo: React.FC<Props> = ({ className, onClick }) => {
  const { theme } = useTheme();
  const logoSrc = theme === ThemeType.Light ? logoLight : logoDark;

  return (
    <Link to="/" className={classNames(styles.logo, className)}>
      <img
        src={logoSrc}
        alt="App logo"
        className={styles.logo__img}
        onClick={onClick}
      />
    </Link>
  );
};
