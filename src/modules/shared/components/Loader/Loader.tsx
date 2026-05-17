import React from 'react';
import styles from './Loader.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  status: 'loading' | 'error' | 'empty';
  classNames?: string;
  onReload?: () => void;
  emptyMessage?: string;
}

export const Loader: React.FC<Props> = ({
  status,
  onReload,
  emptyMessage,
  classNames,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles.container} ${classNames}`}>
      {status === 'loading' && <div className={styles.loading} />}

      {status === 'error' && (
        <div className={styles.error}>
          <p className={styles.message}>{t('ui.something_went_wrong')}</p>
          <button onClick={onReload} className={styles.reloadButton}>
            <span>{t('ui.try_again')}</span>
          </button>
        </div>
      )}

      {status === 'empty' && <p className={styles.message}>{emptyMessage}</p>}
    </div>
  );
};
