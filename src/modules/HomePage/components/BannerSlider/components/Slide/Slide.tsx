//#region imports
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProductLink } from '../../../../../shared/types/ProductLink';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './Slide.module.scss';
//#endregion

type Props = {
  slide: ProductLink;
};

export const Slide: FC<Props> = ({ slide }) => {
  const { t } = useTranslation('homePage');

  const { link, image, title } = slide;

  const productLink = `/product/${link}`;

  return (
    <div className={`${baseStyles.slide} ${styles.slide}`}>
      <div className={styles.promoBlock}>
        <div className={styles.titleBlock}>
          <div className={styles.promoTitle}>{t('bannerTitle')}</div>

          <div className={styles.promoSubtitle}>{t('bannerSubtitle')}</div>
        </div>

        <Link to={productLink} className={styles.orderButton}>
          {t('orderNow')}
        </Link>
      </div>

      <img src={image} alt={title} className={styles.slideImg} />

      <div className={styles.slideCaption}>
        <div className={styles.promoTitle}>{t('bannerTitle')}</div>

        <Link to={productLink} className={styles.titleText}>
          {title}
        </Link>
      </div>
    </div>
  );
};
