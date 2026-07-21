import { FC } from 'react';
import styles from './Slide.module.scss';
import { Link } from 'react-router-dom';
import { SlideContent } from '../MainSlider/SlideContent';

type Props = {
  slide: SlideContent;
};

export const Slide: FC<Props> = ({ slide }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.slide__content}>
        <div className={styles.slide__info}>
          <h2 className={styles.slide__title}>
            <span className={styles.slide__titleText}>
              Now available <br />
              in our store!
            </span>{' '}
            <span className={styles.slide__emoji}>👌</span>
          </h2>

          <p className={styles.slide__subtitle}>Be the first!</p>
        </div>

        <Link to={slide.to} className={styles.slide__link}>
          Order now
        </Link>
      </div>

      <picture className={styles.slide__picture}>
        <source media="(min-width: 640px)" srcSet={slide.desktopSrc} />
        <img src={slide.src} className={styles.slide__image} alt={slide.alt} />
      </picture>
    </div>
  );
};
