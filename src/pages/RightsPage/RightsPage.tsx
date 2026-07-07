import styles from './RightsPage.module.scss';

export const RightsPage = () => (
  <div className="container">
    <div className={styles.page}>
      <p className={styles.brand}>Nice Gadgets</p>
      <h1 className={styles.title}>
        © 2024 Nice Gadgets. All rights reserved.
      </h1>

      <div className={styles.notice}>
        <p>
          All product names, logos, and brands are property of their respective
          owners. All company, product and service names used in this website
          are for identification purposes only.
        </p>
      </div>

      <div className={styles.card}>
        <p className={styles.cardLabel}>Educational project</p>
        <p>
          This is a student project built for educational purposes only. It is
          not affiliated with Apple Inc. or any other company mentioned on the
          site.
        </p>
      </div>
    </div>
  </div>
);
