import { FC } from 'react';

import classNames from 'classnames';
import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { Menu } from '../Menu';
import { SearchButton } from '../../modules/shared/components/SearchButton';

interface Props {
  isActiveMenu?: boolean;
  toggleMenu?: () => void;
  closeMenu?: () => void;
  onSearch?: () => void;
}

export const Header: FC<Props> = ({
  isActiveMenu = false,
  toggleMenu = () => {},
  onSearch = () => {},
  closeMenu = () => {},
}) => {
  const handleOpenSearchModal = () => {
    closeMenu();
    onSearch();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Logo />
      </div>

      <div className={styles.headerNavigation}>
        <Menu onSearch={onSearch} />
      </div>

      <div className={styles.btnsWrapper}>
        <SearchButton onClick={handleOpenSearchModal} />
        <button
          className={classNames(styles.headerMenuBtn, {
            [styles.headerMenuBtnActive]: isActiveMenu,
          })}
          onClick={toggleMenu}
        >
          <span></span>
        </button>
      </div>
    </header>
  );
};
