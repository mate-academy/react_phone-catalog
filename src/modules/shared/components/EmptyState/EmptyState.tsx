import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyState.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  text?: string;
  imgUrl: string;
  showCategories?: boolean;
}

export const EmptyState: React.FC<Props> = ({
  title,
  text,
  imgUrl,
  showCategories = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.empty}>
      <img src={imgUrl} alt={t(title)} className={styles.empty__image} />
      <h2 className={styles.empty__title}>{t(title)}</h2>
      {text && <p className={styles.empty__text}>{t(text)}</p>}

      {showCategories ? (
        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryBtn}>
            {t('nav.phones')}
          </Link>
          <Link to="/tablets" className={styles.categoryBtn}>
            {t('nav.tablets')}
          </Link>
          <Link to="/accessories" className={styles.categoryBtn}>
            {t('nav.accessories')}
          </Link>
        </div>
      ) : (
        <Link to="/" className={styles.empty__button}>
          {t('empty.back')}
        </Link>
      )}
    </div>
  );
};
