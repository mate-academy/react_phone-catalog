import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo/Logo';
import styles from './MobileMenu.module.scss';
import { ThemeToggler } from '@/components/ui/ThemeToggle';
import { LangSwitcher } from '@/components/ui/LanguageSwitcher';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navItems: { key: string; href: string }[];
}

export const MobileMenu = ({ isOpen, onClose, navItems }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.header}>
        <Logo />
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map(item => (
            <li key={item.key}>
              <NavLink
                to={item.href}
                className={styles.navLink}
                onClick={onClose}
              >
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.controls}>
        <LangSwitcher className={styles.mobileSwitcher} />
        <ThemeToggler className={styles.mobileSwitcher} />
        <NavLink to="/favorites" className={styles.actionBtn} onClick={onClose}>
          <Heart size={16} strokeWidth={1.5} />
          {/* <span className={styles.badge}>12</span> */}
        </NavLink>
        <NavLink to="/cart" className={styles.actionBtn} onClick={onClose}>
          <ShoppingBag size={16} strokeWidth={1.5} />
          {/* <span className={styles.badge}>5</span> */}
        </NavLink>
      </div>
    </div>
  );
};
