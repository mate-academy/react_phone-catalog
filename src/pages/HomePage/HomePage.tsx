import { Banner } from '../../components/Banner/Banner';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>

      <Banner />

      <section className={styles.brand__new}></section>

      <section className={styles.categories}></section>

      <section className={styles.hot__prices}></section>
    </main>
  );
};
