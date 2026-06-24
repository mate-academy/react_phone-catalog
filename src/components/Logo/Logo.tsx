import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

import mobileLogo from '../../assets/logo/mobile-logo.png';
import desktopLogo from '../../assets/logo/desktop-logo.png';
import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  const { isVisibleMenu, setIsVisibleMenu } = useContext(MenuContext);

  const toggleMenu = () => {
    if (isVisibleMenu) {
      setIsVisibleMenu(false);
    }
  };

  return (
    <Link
      to="/"
      className={classNames(styles.logo, className)}
      onClick={toggleMenu}
    >
      <picture className={styles.logo__picture}>
        <source
          srcSet={desktopLogo}
          media="(min-width: 1200px)"
          type="image/png"
          className={styles.logo__img}
        />
        <img src={mobileLogo} className={styles.logo__img} alt="Logo" />
      </picture>
    </Link>
  );
};
