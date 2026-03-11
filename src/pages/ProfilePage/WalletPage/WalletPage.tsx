import { Sidebar } from '@components/layout/SideBar';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import styles from './WalletPage.module.scss';

export const WalletPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.walletPage}>
      <div className={styles.walletPage__container}>
        <div className={styles.walletPage__layout}>
          <div className={styles.walletPage__sidebar}>
            <Sidebar />
          </div>

          <main className={styles.walletPage__content}>
            <Breadcrumbs />
            <h1 className={styles.walletPage__title}>{t('nav.wallet')}</h1>
            <p>{t('nav.wallet').toLowerCase()}</p>
          </main>
        </div>
      </div>
    </div>
  );
};
