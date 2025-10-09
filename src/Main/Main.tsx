import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <section className={styles.main__section}>
          <div className={styles.main__sliderContainer}>
            <h1>Welcome to Nice Gadgets store!</h1>
            <button className={styles.main__buttonPrev}></button>

            <div className={styles.main__box}></div>

            <button className={styles.main__buttonNext}></button>

            <ul className={styles.main__dotsBox}>
              <li className={styles.main__dot}>
                <button className={styles.main__dotButton}></button>
              </li>
              <li className={styles.main__dot}>
                <button className={styles.main__dotButton}></button>
              </li>
              <li className={styles.main__dot}>
                <button className={styles.main__dotButton}></button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};
