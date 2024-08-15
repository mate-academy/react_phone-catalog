import styles from './PageLayout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className={styles.Main}>
      <div className={styles.Container}>{children}</div>
    </main>
  );
};
