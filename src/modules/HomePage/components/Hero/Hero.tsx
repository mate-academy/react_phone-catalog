import styles from './Hero.module.scss';
import mainStyles from '../Main/Main.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={mainStyles.layoutGrid}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
    </section>
  );
};
