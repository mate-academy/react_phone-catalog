import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Theme } from '@sTypes/Theme';
import { useAppSelector } from '@store/hooks';

import styles from './Logo.module.scss';

type Props = {
  className?: string;
  footer?: boolean;
};

export const Logo: React.FC<Props> = ({ className, footer = false }) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <Link
      to="/"
      className={classNames(className, styles.logo)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <img
        src={theme === Theme.dark ? './img/logo-dark.png' : './img/logo.png'}
        alt="logo"
        className={classNames(styles.logo__image, {
          [styles['logo__image--footer']]: footer,
        })}
      />
    </Link>
  );
};
