import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';
import classNames from 'classnames';

const logoSrc = 'src/assets/icons/Logo.svg';

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
      aria-label="Go to home"
    >
      <img
        src={logoSrc}
        alt="Logo"
        className={styles.logo__img}
        loading="lazy"
      />
    </Link>
  );
};
