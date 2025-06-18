import { NavLink } from 'react-router-dom';
import styles from './Categories.module.scss';
import { useProducts } from '../../../../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { products } = useProducts();
  const phones = products.filter(item => item.category === 'phones');
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');
  const { t } = useTranslation();

  return (
    <div className={styles.shop}>
      <h2 className={styles.shop__title}>{t('categories')}</h2>
      <div className={styles.shop__categories}>
        <NavLink
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
          to={'phones'}
          className={`${styles.shop__category} ${styles.shop__category__phones}`}
        >
          <div
            className={`${styles.shop__images} ${styles.shop__images__image1}`}
          ></div>
          <div className={styles.shop__categories__title}>{t('mobilePhones')}</div>
          <div className={styles.shop__categories__body}>
            {phones.length} {t('models')}
          </div>
        </NavLink>
        <NavLink
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
          to={'tablets'}
          className={`${styles.shop__category} ${styles.shop__category__tablets}`}
        >
          <div
            className={`${styles.shop__images} ${styles.shop__images__image2}`}
          ></div>
          <div className={styles.shop__categories__title}>{t('tablets')}</div>
          <div className={styles.shop__categories__body}>
            {tablets.length} {t('models')}
          </div>
        </NavLink>
        <NavLink
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
          to={'accessories'}
          className={`${styles.shop__category} ${styles.shop__category__accessories}`}
        >
          <div
            className={`${styles.shop__images} ${styles.shop__images__image3}`}
          ></div>
          <div className={styles.shop__categories__title}>{t('accessories')}</div>
          <div className={styles.shop__categories__body}>
            {accessories.length} {t('models')}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
