import { ArrowIcon } from '@shared/icons';
import styles from '../../styles/sliderMain.module.scss';
import { ErrorElement, Spinner } from '@shared/ui';
import { SkeletonProps } from '../shared';

export const HeroSkeleton = ({ error }: SkeletonProps) => {
  return (
    <section
      aria-label="loading slider"
      aria-busy="true"
      className={styles['hero-slider']}
    >
      <button
        aria-label="Show previous slide"
        className={`${styles['button--prev']} ${styles.button}`}
      >
        <ArrowIcon direction="left" />
      </button>

      <div style={{ display: 'none' }}>
        <div style={{ display: 'none' }}>
          {[1, 2, 3, 4].map(el => (
            <div
              key={el}
              className={styles.track__el}
              role="img"
              aria-label="Loading slide"
            />
          ))}
        </div>
      </div>
      <button aria-label="Show next slide" className={styles.button}>
        <ArrowIcon direction="right" />
      </button>
      <div role="tablist" className={styles.pagination}>
        {[1, 2, 3, 4].map(el => (
          <button
            key={el}
            className={styles['pagination-button']}
            disabled
            aria-label={`Slide ${el}`}
          >
            <div className={styles['pagination-img']} />
          </button>
        ))}
      </div>
      {error ? (
        <ErrorElement message={error} className={styles.modal} />
      ) : (
        <Spinner className={styles.modal} />
      )}
    </section>
  );
};
