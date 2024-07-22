import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.HomePage}>
      <h1 className={styles.HiddenTitle}>Product Catalog</h1>
    </div>
  );
};
