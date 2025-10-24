import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { ButtonNavigation } from '.';
import { NavAriaLabels } from '@shared/types';
import { BurgerMenuIcon, CrossIcon } from '@shared/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { MainNavigation } from '.';

export const Header: React.FC = () => {
  const [isOpened, setOpened] = useState<boolean>(false);

  const closeMenu = () => {
    if (isOpened) {
      setOpened(false);
    }
  };

  return (
    <header
      className={classNames(styles.header, {
        [styles['header--active']]: isOpened,
      })}
    >
      <Link
        to="/"
        className={styles['header-logo']}
        aria-hidden="true"
        tabIndex={-1}
      >
        <img
          src="api/logo.svg"
          alt=""
          aria-hidden="true"
          className={styles['logo-image']}
        />
      </Link>
      <button
        aria-label={isOpened ? NavAriaLabels.CloseMenu : NavAriaLabels.Menu}
        aria-expanded={isOpened}
        className={styles['burger-button']}
        onClick={() => setOpened(!isOpened)}
      >
        {!isOpened ? <BurgerMenuIcon /> : <CrossIcon />}
      </button>
      <MainNavigation closeMenu={closeMenu} />
      <ButtonNavigation closeMenu={closeMenu} />
    </header>
  );
};
