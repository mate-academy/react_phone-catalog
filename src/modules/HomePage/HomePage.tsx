import { Banner } from './Banner';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <h1 className={styles.title}>Product Catalog</h1>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.sectionTitleText}>
            Welcome to Nice Gadgets store!
          </h2>
        </div>
        <Banner />
      </div>
    </>
  );
};
