import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

        <section className={styles.banner}>
          <div className={styles.slider}>
            <button
              className={styles['prev-slide']}
              type="button"
              aria-label="Previous slide"
            ></button>

            <img
              src="img/photos/banner-phones.png"
              alt=""
              className={styles['banner-image']}
            />

            <button
              className={styles['next-slide']}
              type="button"
              aria-label="Next slide"
            ></button>
          </div>
        </section>
      </div>
    </main>
  );
};
