import { LoadingStates } from '@features/index';
import { visualConfig } from '../../model';
import styles from '../../styles/catalogueSlider.module.scss';
import { createLoaderMap, loaderTextMap } from '@ui/index';

export const CatalogueSkeleton = ({ data }: { data: LoadingStates }) => {
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
        {createLoaderMap(loaderTextMap[data], styles.modal, styles.modal)[data]}
      </div>
    </section>
  );
};
