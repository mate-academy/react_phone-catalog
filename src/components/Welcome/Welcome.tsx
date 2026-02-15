import styles from './Welcome.module.scss';
import { Slider } from '../Slider';

export const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcome__inner}>
        <div className={`container ${styles.welcome__container}`}>
          <h1 className={styles.welcome__title}>
            Welcome to Nice Gadgets store!
          </h1>
          <Slider />
        </div>
      </div>
    </section>
  );
};
