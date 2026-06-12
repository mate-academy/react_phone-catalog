/* eslint-disable prettier/prettier */

//#region IMPORTS
import { HeaderLogo } from '../HeaderLogo';
import { HeaderNavigation } from '../HeaderNavigation';
import { HeaderActions } from '../HeaderActions';

import { Button } from '../../../ui/Button';

import iconClose from '@/assets/svg/close.svg';

import styles from './BurgerMenu.module.scss';
//#endregion

//#region STYLES
const {
  menu,
  menuOpen,
  menuTop,
  menuCloseBtn,
  menuNav,
  menuActions,
} = styles;
//#endregion

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  //#region RENDER
  return (
    <div
      className={`
        ${menu}
        ${isOpen ? menuOpen : ''}
      `}
    >
      <div className={menuTop}>
        <HeaderLogo />
        <Button
          variant="icon"
          className={menuCloseBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src={iconClose} alt="Close icon" />
        </Button>
      </div>

      <div className={menuNav}>
        <HeaderNavigation isMobileMenu />
      </div>

      <div className={menuActions}>
        <HeaderActions isMobileMenu />
      </div>
    </div>
  );
  //#endregion
};
