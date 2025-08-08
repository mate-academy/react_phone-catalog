import { Link } from 'react-router-dom';
import styles from './styles/header.module.scss';
import { HeaderButtonNavigation, HeaderMainNavigation } from './ui';
import { NavAriaLabels } from '@shared/types';
import { BurgerMenuIcon, CrossIcon } from '@shared/icons';
import classNames from 'classnames';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [isOpened, setOpened] = useState<boolean>(false);

  const getClassName = () =>
    classNames(styles.header, {
      [styles['header--is-active']]: isOpened,
    });

  return (
    <header className={getClassName()}>
      <Link to="/" className={styles['header-logo']} aria-hidden="true">
        <img
          src="/src/shared/icons/logo.svg"
          alt=""
          aria-hidden="true"
          className={styles['logo-image']}
        />
      </Link>
      <HeaderMainNavigation />
      <button
        aria-label={isOpened ? NavAriaLabels.CloseMenu : NavAriaLabels.Menu}
        className={styles['burger-button']}
        onClick={() => setOpened(!isOpened)}
      >
        {!isOpened ? <BurgerMenuIcon /> : <CrossIcon />}
      </button>
      <HeaderButtonNavigation />
    </header>
  );
};
