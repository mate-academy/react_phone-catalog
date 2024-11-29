import React, { useEffect } from 'react';

import { BackBtn } from '../../../../components/BackBtn';

import styles from './ProductNotFound.module.scss';
import img from '../../../../assets/icons/product-not-found.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  path: string;
  prevPath: string;
  search: string;
}

export const ProductNotFound: React.FC<Props> = ({
  path,
  prevPath,
  search,
}) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.back}>
        <BackBtn path={path} prevPath={prevPath} search={search} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.notFoundImgWrapper}>
          <img
            src={img}
            alt={t('accessibility.productNotFound')}
            className={styles.notFoundImg}
          />
        </div>
        <p className={styles.titleEmpty}>{t('noResult.noProductFound')}</p>
      </div>
    </section>
  );
};
