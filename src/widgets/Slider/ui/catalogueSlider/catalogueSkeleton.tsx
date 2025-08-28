import { visualConfig } from '../../model';
import styles from '../../styles/catalogueSlider.module.scss';
import { SkeletonProps } from '../shared';
import { ErrorElement } from '@ui/errorElement';
import { Spinner } from '@ui/spinner';

export const CatalogueSkeleton = ({ error }: SkeletonProps) => {
  const { animationSpeed, gap } = visualConfig;

  return (
    <section
      className={styles['catalogue-slider']}
      aria-label="loading items"
      aria-busy="true"
    >
      <h2 className={styles.title}>Loading...</h2>
      <button aria-label="Show previous previous" />
      <button aria-label="Show previous next" />
      <div className={styles.viewport}>
        <div
          className={styles.track}
          tabIndex={0}
          style={
            {
              '--gap': `${gap}px`,
              '--animation-speed': `${animationSpeed}ms`,
            } as React.CSSProperties
          }
        ></div>
        {error ? (
          <ErrorElement message={error} className={styles.modal} />
        ) : (
          <Spinner className={styles.modal} />
        )}
      </div>
    </section>
  );
};
