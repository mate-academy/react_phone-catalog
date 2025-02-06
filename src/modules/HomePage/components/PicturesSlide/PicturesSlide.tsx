import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PicturesSlide as Slide } from '../../../../types/PicturesSlide';
import { usePageWidth } from '../../../../hooks/usePageWidth';
import styles from './PicturesSlide.module.scss';

type Props = {
  slide: Slide;
};

export const PicturesSlide: React.FC<Props> = ({ slide }) => {
  const pageWidth = usePageWidth();
  const navigate = useNavigate();

  return (
    <div
      className={styles.PicturesSlide}
      onClick={() => {
        if (pageWidth < 640) {
          navigate(slide.link);
        }
      }}
    >
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
