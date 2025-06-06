import React from 'react';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ListOfTextLinks } from '../listOfTextLinks';
import { ListOfIconLinks } from '../listOfIconLinks';
import { getLogo } from '../../../../utils/getLogo';
import { BurgerMenuSvg } from '../../svg/BurgerMenuSvg';
import { CloseSvg } from '../../svg/CloseSvg';
import { useAppSelector } from '../../../../app/hooks';

type Props = {
  onClickMenu: () => void;
  menuIsOpen: boolean;
};

export const Header: React.FC<Props> = ({ onClickMenu, menuIsOpen }) => {
  const theme = useAppSelector(s => s.theme);

  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.headerLogoLink}>
        <img
          className={styles.headerLogo}
          src={getLogo(theme)}
          alt="Nice gadgets logo"
        />
      </Link>

      <nav className={styles.nav}>
        <ListOfTextLinks direction={'row'} />
        <ListOfIconLinks parentComponent={'header'} />
      </nav>
      {menuIsOpen ? (
        <button
          className={`${styles.burgerMenuButton} ${styles.closeButton}`}
          onClick={onClickMenu}
        >
          <CloseSvg color="var(--active-arrow-svg)" />
        </button>
      ) : (
        <button className={styles.burgerMenuButton} onClick={onClickMenu}>
          <BurgerMenuSvg color="var(--active-arrow-svg)" />
        </button>
      )}
    </header>
  );
};
