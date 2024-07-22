import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { Category } from '../../types/Category';
import gStyles from '../../styles/general.module.scss';
import styles from '../../styles/notFound.module.scss';

export const ProductsListEmpty = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const { t } = useTranslation();

  const LOCALE_CATEGORY = {
    [Category.PHONES]: t(TRANSLATIONS.products.list.empty.phones),
    [Category.TABLETS]: t(TRANSLATIONS.products.list.empty.tablets),
    [Category.ACCESSORIES]: t(TRANSLATIONS.products.list.empty.accessories),
  };

  return (
    <>
      <div className={styles.block}>
        <h2 className={`${gStyles.sectionTitle} ${styles.title}`}>
          {t(TRANSLATIONS.products.list.empty.title, {
            category: LOCALE_CATEGORY[category as Category],
          })}
        </h2>
        <div className={`${styles.bg} ${styles.bg_m_productsList}`}></div>
      </div>
    </>
  );
};
