import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <h1 className={styles.title}>Product Catalog</h1>
      <p>Home page</p>
    </section>
  );
};
