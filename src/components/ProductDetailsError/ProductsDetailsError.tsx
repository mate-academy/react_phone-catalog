import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import gStyles from '../../styles/general.module.scss';
import styles from '../../styles/notFound.module.scss';

export const ProductsDetailsError = () => {
  const { itemId } = useParams();
  const { t } = useTranslation();

  const name = itemId?.replaceAll('-', ' ');

  return (
    <>
      <h2 className={gStyles.sectionTitle}>
        {t(TRANSLATIONS.productDetails.error.title, { name })}
      </h2>

      <p>{t(TRANSLATIONS.productDetails.error.subtitle)}</p>

      <section className={styles.block}>
        <div className={`${styles.bg} ${styles.bg_m_productsList}`}></div>
      </section>
    </>
  );
};
