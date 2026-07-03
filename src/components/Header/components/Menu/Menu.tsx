/* eslint-disable max-len */
// #region imports
import cn from 'classnames';
import { CloseIcon } from '../../../../modules/shared/components/CloseIcon';
import { NavList } from '../../../NavList';
import { NavigationLink } from '../NavigationLink';
import { CartIcon } from '../CartIcon';
import { FavIcon } from '../FavIcon';
import { HomeLink } from '../../../HomeLink';
import { HeaderButton } from '../HeaderButton';
import { useAppSelector } from '../../../../store/hooks';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCloseOnLinkClick } from './hooks/useCloseOnLinkClick';
import { useCloseOnEscape } from '../../../../modules/shared/hooks/useCloseOnEscape';
import { useCloseOnDesktop } from './hooks/useCloseOnDesktop';
import { selectTotalQuantity } from '../../../../store/selectors/cart';
import styles from './Menu.module.scss';
// #endregion

type Props = {
  isOpen: boolean;
  setOpen: (isShowed: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isOpen, setOpen }) => {
  const { t } = useTranslation('header');

  const menuRef = useRef<HTMLElement>(null);
  const onMenuClose = () => {
    setOpen(false);
  };

  const favorites = useAppSelector(state => state.favorites);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  useCloseOnLinkClick(menuRef, onMenuClose);
  useCloseOnEscape(onMenuClose);
  useCloseOnDesktop(onMenuClose);

  return (
    <nav
      ref={menuRef}
      className={cn(styles.menu, {
        [styles.active]: isOpen,
      })}
      aria-label={t('menu')}
      aria-hidden={!isOpen}
    >
      <div className={styles.topBar}>
        <HomeLink size="small" variant="primary" />

        <HeaderButton onClick={() => setOpen(false)} ariaLabel={t('closeMenu')}>
          <CloseIcon type="close" />
        </HeaderButton>
      </div>

      <div className={styles.navList}>
        <NavList />
      </div>

      <div className={styles.bottomButtons}>
        <NavigationLink
          to="/favorites"
          count={favorites.length}
          aria-label={t('favorites')}
        >
          <FavIcon />
        </NavigationLink>

        <NavigationLink to="/cart" count={totalQuantity} aria-label={t('cart')}>
          <CartIcon />
        </NavigationLink>
      </div>
    </nav>
  );
};
