import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['rights-page']}>
      <div className={styles['rights-page__container']}>
        <h1 className={styles['rights-page__title']}>
          {t('rights_page.title')}
        </h1>

        <section className={styles['rights-page__section']}>
          <h2 className={styles['rights-page__section-title']}>
            {t('rights_page.section1_title')}
          </h2>
          <p className={styles['rights-page__paragraph']}>
            {t('rights_page.section1_text')}{' '}
            <Link
              to="/"
              className={styles['rights-page__link']}
            >
              Tech Store
            </Link>
            {t('rights_page.section1_subtext')}
          </p>
        </section>

        <section className={styles['rights-page__section']}>
          <h2 className={styles['rights-page__section-title']}>
            {t('rights_page.section2_title')}
          </h2>
          <p className={styles['rights-page__paragraph']}>
            {t('rights_page.section2_text')}
          </p>
          <ul className={styles['rights-page__list']}>
            <li>{t('rights_page.section2_list.0')}</li>
            <li>
              <Link
                to="/"
                className={styles['rights-page__link']}
              >
                Tech Store
              </Link>{' '}
              {t('rights_page.section2_list.1')}
            </li>
            <li>{t('rights_page.section2_list.2')}</li>
          </ul>
        </section>

        <section className={styles['rights-page__section']}>
          <h2 className={styles['rights-page__section-title']}>
            {t('rights_page.section3_title')}
          </h2>
          <p className={styles['rights-page__paragraph']}>
            {t('rights_page.section3_text1')}{' '}
            <Link
              to="/"
              className={styles['rights-page__link']}
            >
              Tech Store
            </Link>{' '}
            {t('rights_page.section3_text2')}
          </p>
        </section>

        <section className={styles['rights-page__section']}>
          <h2 className={styles['rights-page__section-title']}>
            {t('rights_page.section4_title')}
          </h2>
          <p
            className={`${styles['rights-page__paragraph']} ${styles['rights-page__paragraph--bold']}`}
          >
            {t('rights_page.section4_text1')}{' '}
            <Link
              to="/"
              className={styles['rights-page__link']}
            >
              Tech Store
            </Link>{' '}
            {t('rights_page.section4_text2')}
          </p>
        </section>

        <div className={styles['rights-page__footer']}>
          <p className={styles['rights-page__footer-text']}>
            {t('rights_page.updated')}
          </p>
        </div>
      </div>
    </div>
  );
};
