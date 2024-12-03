import styles from './PageNotFound.module.scss';
import img from '../../assets/icons/page-not-found.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.notFoundImgWrapper}>
        <img
          src={img}
          alt={t('accessibility.pageNotFound')}
          className={styles.notFoundImg}
        />
      </div>
      <p className={styles.notFoundTitle}>{t('noResult.noPageFound')}</p>
      <Link to={'/'} className={classNames('ctaBtn', styles.homepageBtn)}>
        {t('buttons.toHome')}
      </Link>
    </section>
  );
};
