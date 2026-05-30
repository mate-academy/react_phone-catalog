import s from './Header.module.scss';
import { TopBar } from './components/TopBar';
import { BurgerMenu } from './components/BurgerMenu';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useAppContext } from '../../context/app/useAppContext';

export const Header = () => {
  const { isMenuOpen } = useAppContext();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={classNames(s.header, { [s.openMenu]: isMenuOpen })}>
      <TopBar />
      {isMenuOpen && <BurgerMenu />}
    </header>
  );
};
