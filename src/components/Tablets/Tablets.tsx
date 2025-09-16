import styles from './Tablets.module.scss';
import { Products } from '../ProductComponent/Products';
import { useTablets } from '../../contexts/TabletsContext';
import { Loader } from '../Loader';
import { SectionBreadcrumbs } from '../SectionBreadcrumbs';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Tablets = () => {
  const { tablets, isLoading, isError, reload } = useTablets();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section className={styles.tablets} id="tablets">
      <SectionBreadcrumbs currentLink={t('nav.tablets')} />

      <h1 className={styles.tablets__title}>{t('nav.tablets')}</h1>

      {tablets.length !== 0 && !isLoading && (
        <p className={styles.tablets__quantity}>
          {tablets.length === 1
            ? t('elements.model')
            : t('elements.models', { count: tablets.length })}
        </p>
      )}

      {isLoading && <Loader />}

      {tablets.length !== 0 && !isLoading && <Products products={tablets} />}

      {!tablets.length && !isError && !isLoading && (
        <p className={styles.tablets__noProducts}>{t('errors.noTablets')}</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.tablets__error}>{t('errors.smthWrong')}</p>
          <button
            type="button"
            onClick={reload}
            className={`${styles.tablets__reload} ${theme === 'light' && styles['tablets__reload--lightTheme']}`}
          >
            {t('buttonText.reload')}
          </button>
        </>
      )}
    </section>
  );
};
