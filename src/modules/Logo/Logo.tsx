import React, { useContext } from 'react';
import styles from './Logo.module.scss';
import { MainContext } from '../../context/MainContext';
import okSign from '/public/img/icons/ok-sign.png';

interface Props {
  mobileLogoStyles?: React.CSSProperties;
  mobileLogoIconStyles?: React.CSSProperties;
}

export const Logo: React.FC<Props> = React.memo(
  ({ mobileLogoStyles, mobileLogoIconStyles }) => {
    const { isMobile } = useContext(MainContext);

    return (
      <div className={styles.logo} style={isMobile ? mobileLogoStyles : {}}>
        Nice
        <img
          className={styles.icon}
          style={isMobile ? mobileLogoIconStyles : {}}
          src={okSign}
          alt="Nice gadgets"
        />
        gadgets
      </div>
    );
  },
);

Logo.displayName = 'Logo';
