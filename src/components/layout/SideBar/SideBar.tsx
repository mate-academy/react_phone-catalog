import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';
import { supabase } from '@utils/supabaseClient';
import { useAppContext } from '@hooks/useAppContext';

export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Отримуємо значення напряму з контексту, а не викликаємо як функцію
  const { favoritesCount } = useAppContext();

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserName(user.user_metadata?.full_name || '');
      setUserEmail(user.email || '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      setIsAdmin(profile?.is_admin ?? false);
    };

    fetchUser();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.avatarPlaceholder}>
          {userName ? userName.charAt(0) : '?'}
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.name}>
            {userName || t('profile_sidebar.guest')}
          </p>
          <p className={styles.email}>{userEmail}</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/profile"
          className={`${styles.navItem} ${isActive('/profile') ? styles.active : ''}`}
        >
          {t('profile_sidebar.account')}
        </Link>

        {isAdmin && (
          <Link
            to="/profile/admin"
            className={`${styles.navItem} ${isActive('/profile/admin') ? styles.active : ''}`}
          >
            {t('profile_sidebar.admin')}
          </Link>
        )}

        <Link
          to="/profile/orders"
          className={`${styles.navItem} ${isActive('/profile/orders') ? styles.active : ''}`}
        >
          {t('profile_sidebar.orders')}
        </Link>

        <Link
          to="/profile/chat"
          className={`${styles.navItem} ${isActive('/profile/chat') ? styles.active : ''}`}
        >
          <span>{t('profile_sidebar.chat')}</span>
        </Link>

        <div className={styles.divider}></div>

        <Link
          to="/favorites"
          className={`${styles.navItem} ${isActive('/favorites') ? styles.active : ''}`}
        >
          <span>{t('profile_sidebar.wishlist')}</span>
          <span className={styles.badge}>{favoritesCount}</span>
        </Link>
      </nav>
    </aside>
  );
};
