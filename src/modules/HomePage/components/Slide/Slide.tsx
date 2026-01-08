import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Slide.module.scss';
import { Button } from '@/modules/shared/components/Button';
import { SlideUI } from '@/modules/shared/types/SlideUI';

export const Slide: FC<SlideUI> = ({
  bannerPreviewPath,
  url,
  bannerTitle = 'Now available in our store',
  productDescription,
  productTitle,
}) => {
  return (
    <div className={styles.slide}>
      <Link to={url} className={styles.productLink} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>{bannerTitle}</h2>
          <Button to={url} variant="outline" className={styles.orderBtn}>
            Order now
          </Button>
        </div>
        <div className={styles.productContent}>
          <div className={styles.productTextWrapper}>
            <h3 className={styles.productTitle}>{productTitle}</h3>
            <p className={styles.productDesc}>
              <b>{productDescription}</b>
            </p>
          </div>
          <div className={styles.productPreview}>
            <img src={bannerPreviewPath} alt={productTitle} />
          </div>
        </div>
      </div>
    </div>
  );
};
