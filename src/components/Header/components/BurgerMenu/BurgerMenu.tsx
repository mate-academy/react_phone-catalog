import classNames from 'classnames';
import s from './BurgerMenu.module.scss';
import { NavList } from '../NavList';
import { NavIcons } from '../NavIcons';
import { useAppContext } from '../../../../context/app/useAppContext';

export const BurgerMenu = () => {
  const { isMenuOpen } = useAppContext();

  return (
    <aside className={classNames(s.menu, { [s.isOpen]: isMenuOpen })}>
      <nav className={s.nav}>
        <NavList variant="burger" />
      </nav>

      <NavIcons variant="burger" />
    </aside>
  );
};
