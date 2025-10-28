import styles from './ShopByCategory.module.scss';
import { useTranslation } from 'react-i18next';

export const ShopByCategory = () => {
  const { t } = useTranslation();

  return (
    <section className={styles['shop-by-category']}>
      <h2
        className={`${styles['shop-by-category__header']} ${styles.section__title}`}
      >
        {t('shopByCategory.title')}
      </h2>
      <div className={styles['shop-by-category__list']}>
        <div className={styles['shop-by-category__item']}>
          <div
            className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-mobile']}`}
          >
            <a href="#phones" className={styles['shop-by-category__link']}>
              <img
                src="img/category-phones.webp"
                alt={t('shopByCategory.mobilePhones')}
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>
              {t('shopByCategory.mobilePhones')}
            </div>
            <div className={styles['shop-by-category__item-count']}>
              {t('shopByCategory.models', { count: 98 })}
            </div>
          </div>
        </div>

        <div className={styles['shop-by-category__item']}>
          <div
            className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-tablet']}`}
          >
            <a href="#tablets" className={styles['shop-by-category__link']}>
              <img
                src="img/category-tablets.webp"
                alt={t('shopByCategory.tablets')}
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>
              {t('shopByCategory.tablets')}
            </div>
            <div className={styles['shop-by-category__item-count']}>
              {t('shopByCategory.models', { count: 24 })}
            </div>
          </div>
        </div>

        <div className={styles['shop-by-category__item']}>
          <div
            className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-accessories']}`}
          >
            <a href="#accessories" className={styles['shop-by-category__link']}>
              <img
                src="img/category-accessories.webp"
                alt={t('shopByCategory.accessories')}
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>
              {t('shopByCategory.accessories')}
            </div>
            <div className={styles['shop-by-category__item-count']}>
              {t('shopByCategory.models', { count: 100 })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
