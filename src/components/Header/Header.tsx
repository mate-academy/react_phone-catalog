import { useState } from 'react';
import { NavIconsVariant, NavListVariants } from '../../types/Types';
import { Navbar } from '../Navbar/Navbar';
import { NavIcons } from '../NavIcons/NavIcons';
import styles from './Header.module.scss';
import { NavList } from '../NavList/NavList';
import cn from 'classnames';

export const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurberClosing = (event: React.MouseEvent<HTMLElement>) => {
    if (!isBurgerOpen) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('a, button')) {
      setIsBurgerOpen(false);
    }
  };

  return (
    <header className={styles.header} onClick={handleBurberClosing}>
      <Navbar />

      <div className={cn(styles.burger, isBurgerOpen && styles.burgerOpen)}>
        <NavList variant={NavListVariants.burger} />
        <NavIcons variant={NavIconsVariant.burger} />
      </div>

      <NavIcons
        variant={NavIconsVariant.header}
        isBurgerOpen={isBurgerOpen}
        onButtonClick={setIsBurgerOpen}
      />
    </header>
  );
};
