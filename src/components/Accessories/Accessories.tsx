import styles from './Accessories.module.scss';
import { Products } from '../ProductComponent/Products';
import { useAccessories } from '../../contexts/AccessoriesContext';
import { Loader } from '../Loader';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { SectionBreadcrumbs } from '../SectionBreadcrumbs';

export const Accessories = () => {
  const { accessories, isError, isLoading, reload } = useAccessories();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section className={styles.accessories} id="phones">
      <SectionBreadcrumbs currentLink={t('nav.accessories')} />

      <h1 className={styles.accessories__title}>{t('nav.accessories')}</h1>

      {accessories.length !== 0 && !isLoading && (
        <p className={styles.accessories__quantity}>
          {accessories.length === 1
            ? t('elements.model')
            : t('elements.models', { count: accessories.length })}
        </p>
      )}

      {isLoading && <Loader />}

      {accessories.length !== 0 && !isLoading && <Products products={accessories} />}

      {!accessories.length && !isError && !isLoading && (
        <p className={styles.accessories__noProducts}>{t('errors.noAccessories')}</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.accessories__error}>{t('errors.smthWrong')}</p>
          <button
            type="button"
            onClick={reload}
            className={`${styles.accessories__reload} ${theme === 'light' && styles['accessories__reload--lightTheme']}`}
          >
            {t('buttonText.reload')}
          </button>
        </>
      )}
    </section>
  );
};
