import styles from './ProductInfo.module.scss';

export const ProductInfo = () => {
  return (
    <section className={styles.productInfo}>
      <div className={styles.productInfo__about}>
        <h3 className={styles.productInfo__title}>About</h3>
        <hr className={styles.productInfo__line} />
        <article className={styles.productInfo__article}>
          <h4 className={styles.productInfo__articleTitle}>
            And then there was Pro
          </h4>
          <p className={styles.productInfo__description}>
            A transformative triple‑camera system that adds tons of capability
            without complexity. An unprecedented leap in battery life. And a
            mind‑blowing chip that doubles down on machine learning and pushes
            the boundaries of what a smartphone can do. Welcome to the first
            iPhone powerful enough to be called Pro.
          </p>
        </article>
        <article className={styles.productInfo__article}>
          <h4 className={styles.productInfo__articleTitle}>
            And then there was Pro
          </h4>
          <p className={styles.productInfo__description}>
            A transformative triple‑camera system that adds tons of capability
            without complexity. An unprecedented leap in battery life. And a
            mind‑blowing chip that doubles down on machine learning and pushes
            the boundaries of what a smartphone can do. Welcome to the first
            iPhone powerful enough to be called Pro.
          </p>
        </article>
      </div>
      <div className={styles.productInfo__tech}>
        <h3 className={styles.productInfo__title}>Tech specs</h3>
        <hr className={styles.productInfo__line} />
        <ul className={styles.productInfo__list}>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Screen</p>
            <p className={styles.productInfo__itemTech}>6.5” OLED</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Resolution</p>
            <p className={styles.productInfo__itemTech}>2688x1242</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Processor</p>
            <p className={styles.productInfo__itemTech}>Apple A12 Bionic</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>RAM</p>
            <p className={styles.productInfo__itemTech}>3 GB</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Built in memory</p>
            <p className={styles.productInfo__itemTech}>64 GB</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Camera</p>
            <p className={styles.productInfo__itemTech}>
              12 Mp + 12 Mp + 12 Mp (Triple)
            </p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Zoom</p>
            <p className={styles.productInfo__itemTech}>Optical, 2x</p>
          </li>
          <li className={styles.productInfo__items}>
            <p className={styles.productInfo__itemTitle}>Cell</p>
            <p className={styles.productInfo__itemTech}>GSM, LTE, UMTS</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
