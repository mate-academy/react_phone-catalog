import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Slide.module.scss';
import { Button } from '@/modules/shared/components/Button';
import { SlideUI } from '@/modules/HomePage/types/SlideUI';

export const Slide: FC<SlideUI> = ({
  bannerPreviewPath,
  url,
  bannerTitle = 'Now available in our store',
  productDescription,
  productTitle,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.slide}>
      <Link to={url} className={styles.productLink} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>{bannerTitle}</h2>
          <Button
            variant="outline"
            className={styles.orderBtn}
            onClick={() => navigate(url)}
          >
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
