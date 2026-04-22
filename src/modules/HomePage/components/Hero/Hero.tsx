import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className="layoutGrid">
          <h1 className={styles.title}>Product Catalog</h1>
        </div>
      </div>
    </section>
  );
};
