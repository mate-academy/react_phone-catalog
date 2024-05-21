import { useState } from 'react';
import { TABLET_SIZE } from '../../consts/consts';
import { useWindowDimensions } from '../../hooks/hooks';
import { Burger } from './Burger';
import styles from './Header.module.scss';
import { HeaderTools } from './HeaderTools';
import { Logo } from './Logo';

export const Header = () => {
  const { width } = useWindowDimensions();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(state => !state);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Logo />

        <HeaderTools isOpen={isOpen} />
        {width < TABLET_SIZE && (
          <Burger handleOpenMenu={handleOpenMenu} isOpen={isOpen} />
        )}
      </div>
    </header>
  );
};
