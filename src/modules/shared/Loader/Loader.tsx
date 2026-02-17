import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

const Loader: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.loader} ${className}`} role="status">
      <div className={styles.loader__spinner} />
      <span className="sr-only" style={{ display: 'none' }}>
        Loading...
      </span>
    </div>
  );
};

export default Loader;
