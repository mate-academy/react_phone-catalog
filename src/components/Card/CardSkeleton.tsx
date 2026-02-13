import { useAppDispatch } from '../../Context/AppContext';
import styles from './Card.module.scss';

export const CardSkeleton: React.FC = () => {
  const { refCardWidth } = useAppDispatch();

  return (
    <div
      ref={refCardWidth as unknown as React.LegacyRef<HTMLDivElement>}
      className={`${styles.card} ${styles.isLoading}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.about}>
          <p className={styles.name}></p>
          <div className={styles.price}></div>

          <div className={styles.description}>
            <div className={styles.keys}>
              <div className={styles.key}></div>
              <div className={styles.key}></div>
              <div className={styles.key}></div>
            </div>

            <div className={styles.values}>
              <div className={styles.value}></div>
              <div className={styles.value}></div>
              <div className={styles.value}></div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  );
};
