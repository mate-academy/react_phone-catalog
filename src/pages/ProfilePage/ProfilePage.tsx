import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import styles from './ProfilePage.module.scss';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { Loader } from '@components/ui/Loader/Loader';
import { Sidebar } from '@components/layout/SideBar';

export const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPhone = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('phone')
      .eq('user_id', userId)
      .not('phone', 'is', null)
      .limit(1)
      .maybeSingle();
    if (!error && data?.phone) setPhone(data.phone);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchPhone(session.user.id);
      } else {
        navigate('/');
      }
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === 'ua' ? 'uk-UA' : 'en-GB',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePage__container}>
        <div className={styles.profilePage__layout}>
          <Sidebar />
          <main className={styles.profilePage__content}>
            <Breadcrumbs />
            <h1 className={styles.profilePage__title}>{t('profile.title')}</h1>
            {user ?
              <div className={styles.userInfoWrapper}>
                <div className={styles.userInfo}>
                  <img
                    src={
                      user.user_metadata.avatar_url ||
                      'https://cdn-icons-png.flaticon.com/512/4519/4519729.png'
                    }
                    className={styles.userInfo__photo}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                  />
                  <div className={styles.userInfo__details}>
                    <p className={styles.userInfo__label}>
                      {t('profile.name')}:
                    </p>
                    <span className={styles.userInfo__value}>
                      {user.user_metadata.full_name || '-'}
                    </span>
                    <p className={styles.userInfo__label}>
                      {t('profile.email')}:
                    </p>
                    <span className={styles.userInfo__value}>{user.email}</span>
                    {phone && (
                      <>
                        <p className={styles.userInfo__label}>
                          {t('profile.phone')}:
                        </p>
                        <span className={styles.userInfo__value}>{phone}</span>
                      </>
                    )}
                    <p className={styles.userInfo__label}>
                      {t('profile.created')}:
                    </p>
                    <span className={styles.userInfo__value}>
                      {formatDate(user.created_at)}
                    </span>
                    <button
                      onClick={handleLogout}
                      className={styles.logoutButton}
                    >
                      {t('profile.logout')}
                    </button>
                  </div>
                </div>
              </div>
            : <div className={styles.loading}>
                <Loader />
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  );
};
