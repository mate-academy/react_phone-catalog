import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import phonesTb from '@/assets/images/categories/phones-tb.png';
import tabletsTb from '@/assets/images/categories/tablets-tb.png';
import accessoriesTb from '@/assets/images/categories/accessories-tb.png';
import { useProducts } from '@/app/providers/Products';
import { useLayoutEffect, useMemo } from 'react';

export const SectionCategories = () => {
  const { t } = useTranslation();
  const { products, loadProducts } = useProducts();

  useLayoutEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const quantityOfTablets = useMemo(() => {
    return products?.filter((item) => item.category === 'tablets').length;
  }, [products]);

  const quantityOfPhones = useMemo(() => {
    return products?.filter((item) => item.category === 'phones').length;
  }, [products]);

  const quantityOfAccessories = useMemo(() => {
    return products?.filter((item) => item.category === 'accessories').length;
  }, [products]);

  return (
    <section>
      <h2 className={styles.title}>{t('sectionCategories.title')}</h2>
      <div className={styles.categories}>
        <div className={styles.gridContainer}>
          <Link className={styles.category} to="./phones">
            <div className={styles.imgWrapper}>
              <div className={styles.imgTransform}>
                <img className={styles.img} src={phonesTb} alt="Phones categories" loading="lazy" />
              </div>
            </div>
            <h3 className={styles.categoryTitle}>{t('sectionCategories.modile')}</h3>
            <p className={styles.categoryParagraph}>
              {' '}
              {quantityOfPhones ? quantityOfPhones : '...'} {t('sectionCategories.models')}
            </p>
          </Link>
          <Link className={styles.category} to="./tablets">
            <div className={styles.imgWrapper}>
              <div className={styles.imgTransform}>
                <img
                  className={styles.img}
                  src={tabletsTb}
                  alt="Tablets categories"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className={styles.categoryTitle}>{t('sectionCategories.tablets')}</h3>
            <p className={styles.categoryParagraph}>
              {' '}
              {quantityOfTablets ? quantityOfTablets : '...'} {t('sectionCategories.tablets')}
            </p>
          </Link>
          <Link className={styles.category} to="./accessories">
            <div className={styles.imgWrapper}>
              <div className={styles.imgTransform}>
                <img
                  className={styles.img}
                  src={accessoriesTb}
                  alt="Accessories categories"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className={styles.categoryTitle}>{t('sectionCategories.accessories')}</h3>
            <p className={styles.categoryParagraph}>
              {' '}
              {quantityOfAccessories ? quantityOfAccessories : '...'}{' '}
              {t('sectionCategories.accessories')}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
