import styles from './Loader.module.scss';

type Props = {
  label?: string;
};

export const Loader = ({ label = 'Loading...' }: Props) => {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      {label}
    </div>
  );
};
