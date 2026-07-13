import React from 'react';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  phoneQuantity: number;
  tabletsQuantity: number;
  accessoriesQuantity: number;
}

export const Category: React.FC<Props> = ({
  phoneQuantity,
  tabletsQuantity,
  accessoriesQuantity,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.category}>
      <div className={styles.topSide}>
        <h2 className={styles.title}>{t('Category')}</h2>
      </div>
      <div className={styles.bottomSide}>
        <Link
          to="phones"
          className={`${styles.section} ${styles.firstSection}`}
        >
          <div className={`${styles.sectionBox} ${styles.firstSectionBox}`}>
            <img src="/img/category-phones.png" alt="" />
          </div>
          <div className={styles.sectionText}>
            <h4 className={styles.sectionTitle}>{t('Mobile')}</h4>
            <p className={styles.sectionParagraph}>
              {phoneQuantity} {t('Models')}
            </p>
          </div>
        </Link>

        <Link
          to="tablets"
          className={`${styles.section} ${styles.secondSection}`}
        >
          <div className={`${styles.sectionBox} ${styles.secondSectionBox}`}>
            <img src="/img/category-tablets.png" alt="" />
          </div>
          <div className={styles.sectionText}>
            <h4 className={styles.sectionTitle}>{t('Tablets')}</h4>
            <p className={styles.sectionParagraph}>
              {tabletsQuantity} {t('Models')}
            </p>
          </div>
        </Link>

        <Link
          to="accessories"
          className={`${styles.section} ${styles.thirdSection}`}
        >
          <div className={`${styles.sectionBox} ${styles.thirdSectionBox}`}>
            <img src="/img/category-accessories.png" alt="" />
          </div>
          <div className={styles.sectionText}>
            <h4 className={styles.sectionTitle}>{t('Accessories')}</h4>
            <p className={styles.sectionParagraph}>
              {accessoriesQuantity} {t('Models')}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
