//#region imports
import { BackButton } from '../../../shared/components/BackButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/hooks/useTheme';
import styles from './ProductDetailsEmpty.module.scss';
//#endregion

export const ProductDetailsEmpty = () => {
  const { t } = useTranslation('productDetails');
  const { isDark } = useTheme();

  const imgScr = isDark
    ? './img/darkTheme/product-not-found.png'
    : './img/product-not-found.png';

  return (
    <section className={styles.productEmpty}>
      <div className={styles.backButton}>
        <BackButton />
      </div>

      <h1>{t('productEmpty')}</h1>

      <img src={imgScr} alt="productWasNotFound" className={styles.img} />
    </section>
  );
};
