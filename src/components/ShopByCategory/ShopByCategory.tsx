import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { usePhones } from '../../contexts/PhonesContext';
import { useTablets } from '../../contexts/TabletsContext';
import { useAccessories } from '../../contexts/AccessoriesContext';

export const ShopByCategory = () => {
  const { t } = useTranslation();
  const { phones } = usePhones();
  const { tablets } = useTablets();
  const { accessories } = useAccessories();

  return (
    <section className={styles.ShopByCategory}>
      <h2 className={styles.ShopByCategory__title}>{t('sections.shopByCategory')}</h2>

      <div className={styles.ShopByCategory__categories}>
        <article className={styles.ShopByCategory__category}>
          <Link to="/phones">
            <img
              src="/img/phones-category.png"
              alt="Phones"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/phones" className={styles.ShopByCategory__categoryTitle}>
            {t('sections.mobilePhones')}
          </Link>

          <p className={styles.ShopByCategory__categoryQuantity}>
            {phones.length === 1
              ? t('elements.model')
              : t('elements.models', { count: phones.length })}
          </p>
        </article>

        <article className={styles.ShopByCategory__category}>
          <Link to="/tablets">
            <img
              src=".public/img/tablets-category.png"
              alt="Tablets"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/tablets" className={styles.ShopByCategory__categoryTitle}>
            {t('nav.tablets')}
          </Link>
          <p className={styles.ShopByCategory__categoryQuantity}>
            {tablets.length === 1
              ? t('elements.model')
              : t('elements.models', { count: tablets.length })}
          </p>
        </article>

        <article className={styles.ShopByCategory__category}>
          <Link to="/accessories">
            <img
              src="public/img/accessories-category.png"
              alt="Accessories"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/accessories" className={styles.ShopByCategory__categoryTitle}>
            {t('nav.accessories')}
          </Link>

          <p className={styles.ShopByCategory__categoryQuantity}>
            {accessories.length === 1
              ? t('elements.model')
              : t('elements.models', { count: accessories.length })}
          </p>
        </article>
      </div>
    </section>
  );
};
