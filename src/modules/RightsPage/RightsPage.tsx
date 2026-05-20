import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Rights</h1>
      <p className={styles.page__text}>
        All rights reserved © Nice Gadgets 2026.
        <br />
        Terms and conditions apply.
      </p>
    </div>
  );
};
