import { NAV_LINKS } from '../../../constants/navLinks';
import { NavLinkItem } from '../NavLinkItem/NavLInkItem';
import styles from '../Header.module.scss';
import { HeaderIcons } from '../HeaderIcons/HeaderIcons';

export const SidebarMenu = () => {
  return (
    <aside className={styles.sidepanel}>
      <div className={styles.sidepanel__container}>
        <nav className={styles.navbar__list}>
          {NAV_LINKS.map(link => (
            <NavLinkItem key={link.label} to={link.to} label={link.label} />
          ))}
        </nav>
        <HeaderIcons />
      </div>
    </aside>
  );
};
