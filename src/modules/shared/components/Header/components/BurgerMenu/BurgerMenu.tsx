/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useTranslation } from 'react-i18next';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderNavigation } from '../HeaderNavigation';
import { HeaderActions } from '../HeaderActions';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeToggler } from '../ThemeToggler';

import { Button } from '../../../ui/Button';

import IconClose from '@/assets/svg/close.svg?react';

import styles from './BurgerMenu.module.scss';
//#endregion

//#region STYLES
const {
  menu,
  menuOpen,
  menuTop,
  menuCloseBtn,
  menuNav,
  menuSettings,
  menuActions,
  iconClose,
} = styles;
//#endregion

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  // #region TRANSLATION
  const { t } = useTranslation();
  // #endregion

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

        <div className={menuSettings}>
          <LanguageSwitcher />
          <ThemeToggler />
        </div>

        <Button
          variant="icon"
          className={menuCloseBtn}
          onClick={onClose}
          aria-label={t('burgerMenu.closeBtn')}
        >
          <IconClose
            className={iconClose}
            aria-label={t('burgerMenu.closeIcon')}
          />
        </Button>
      </div>

      <div className={menuNav}>
        <HeaderNavigation isBurgerMenu />
      </div>

      <div className={menuActions}>
        <HeaderActions isBurgerMenu />
      </div>
    </div>
  );
  //#endregion
};
