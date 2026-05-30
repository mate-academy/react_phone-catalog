import styles from './Error.module.scss';

type Props = {
  fetchProducts: () => void;
};

export const Error: React.FC<Props> = ({ fetchProducts }) => {
  return (
    <div className={styles.error}>
      <h2>Something went wrong</h2>
      <div className={styles.error__button} onClick={fetchProducts}>
        Reload
      </div>
    </div>
  );
};
