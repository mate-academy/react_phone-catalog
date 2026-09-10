import styles from './PageLayout.module.scss';

interface Props {
  topNav: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout = ({ topNav, header, children }: Props) => {
  return (
    <main className={styles.pageLayout}>
      {topNav}

      <section className={styles.content}>
        {header}

        {children}
      </section>
    </main>
  );
};
