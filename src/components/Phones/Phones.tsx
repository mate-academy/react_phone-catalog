import styles from './Phones.module.scss';
import { Products } from '../ProductComponent/Products';
import { usePhones } from '../../contexts/PhonesContext';
import { Loader } from '../Loader';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { SectionBreadcrumbs } from '../SectionBreadcrumbs';
export const Phones = () => {
  const { phones, isError, isLoading, reload } = usePhones();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section className={styles.phones} id="phones">
      <SectionBreadcrumbs currentLink={t("nav.phones")}/>
      <h1 className={styles.phones__title}>{t('sections.mobilePhones')}</h1>

      {phones.length !== 0 && !isLoading && (
        <p className={styles.phones__quantity}>
          {phones.length === 1
            ? t('elements.model')
            : t('elements.models', { count: phones.length })}
        </p>
      )}

      {isLoading && <Loader />}

      {phones.length !== 0 && !isLoading && <Products products={phones} />}

      {!phones.length && !isError && !isLoading && (
        <p className={styles.phones__noProducts}>{t("errors.noPhones")}</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.phones__error}>{t('errors.smthWrong')}</p>
          <button
            type="button"
            onClick={reload}
            className={`${styles.phones__reload} ${theme === 'light' && styles['phones__reload--lightTheme']}`}
          >
            {t('buttonText.reload')}
          </button>
        </>
      )}
    </section>
  );
};
