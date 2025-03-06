import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MainContext } from '../../../../context/MainContext';
import { Logo } from '../../../Logo';
import styles from './HeaderLink.module.scss';

export const HeaderLink: React.FC = React.memo(() => {
  const { isOnHomePage } = useContext(MainContext);

  const mobileLogoStyles: React.CSSProperties = {
    fontSize: '14px',
  };

  const mobileLogoIconStyles: React.CSSProperties = {
    width: '10px',
  };

  return (
    <Link
      className={classNames(styles['logo-wrapper'], {
        [styles['is-active']]: isOnHomePage,
      })}
      to="/"
    >
      <Logo
        mobileLogoStyles={mobileLogoStyles}
        mobileLogoIconStyles={mobileLogoIconStyles}
      />
    </Link>
  );
});

HeaderLink.displayName = 'HeaderLink';
