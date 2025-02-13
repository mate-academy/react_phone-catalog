import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type Props = {
  className?: string;
  footer?: boolean;
};

export const Logo: React.FC<Props> = ({ className, footer = false }) => (
  <Link
    to="/"
    className={classNames(className, styles.logo)}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <img
      src="./img/logo.png"
      alt="logo"
      className={classNames(styles.logo__image, {
        [styles['logo__image--footer']]: footer,
      })}
    />
  </Link>
);
