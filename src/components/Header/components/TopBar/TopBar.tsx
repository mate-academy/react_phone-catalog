import s from './TopBar.module.scss';
import { NavIcons } from '../NavIcons';
import { NavList } from '../NavList';
import { Logo } from '../../../Logo';

export const TopBar = () => {
  return (
    <div className={s.topBar}>
      <div className={s.logoWrapper}>
        <Logo />
      </div>

      <nav className={s.nav} aria-label="Main navigation">
        <NavList variant="topbar" />
      </nav>
      <NavIcons />
    </div>
  );
};
