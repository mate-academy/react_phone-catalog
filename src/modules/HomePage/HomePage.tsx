import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.content}>
        <section className={styles.slider}>
          <div className={styles.container}>
            <button className={styles['slider__button--prev']}>
              <span></span>
            </button>

            <img
              src="img/photos/banner-phones.png"
              alt="Banner-phones"
              className={styles.slider__img}
            />
            <button className={styles['slider__button--next']}>
              <span></span>
            </button>
          </div>

          <div className={styles.pagination}>
            <button></button>
            <button></button>
            <button></button>
          </div>
        </section>
      </div>
    </main>
  );
};
