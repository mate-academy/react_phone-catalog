import React from 'react';
import styles from './PicturesSlide.module.scss';
import { PicturesSlide as Slide } from '../../../../types/PicturesSlide';
import { Link } from 'react-router-dom';
import { usePageWidth } from '../../../../hooks/usePageWidth';

type Props = {
  slide: Slide;
};

export const PicturesSlide: React.FC<Props> = ({ slide }) => {
  const pageWidth = usePageWidth();

  return (
    <div className={styles.PicturesSlide}>
      <div className={styles.PicturesSlide__left}>
        <h2 className={styles.PicturesSlide__title}>
          Now available
          <br />
          in our store!
        </h2>
        <p className={styles.PicturesSlide__subTitle}>Be the first!</p>
        <Link to={slide.link} className={styles.PicturesSlide__btn}>
          Order now
        </Link>
      </div>

      <div className={styles.PicturesSlide__right}>
        {pageWidth < 640 && (
          <h2 className={styles.PicturesSlide__title}>
            Now available
            <br />
            in our store!
          </h2>
        )}

        {slide.title && (
          <h3 className={styles.PicturesSlide__imgTitle}>{slide.title}</h3>
        )}
        {slide.subTitle && (
          <p className={styles.PicturesSlide__imgSubTitle}>{slide.subTitle}</p>
        )}

        <img className={styles.PicturesSlide__img} src={slide.imgBig} alt="" />
      </div>
    </div>
  );
};
