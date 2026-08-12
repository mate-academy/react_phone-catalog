import styles from './Loader.module.scss';

type Props = {
  text?: string;
};

export const Loader = ({ text = 'Loading...' }: Props) => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />

      <p className={styles.text}>{text}</p>
    </div>
  );
};
