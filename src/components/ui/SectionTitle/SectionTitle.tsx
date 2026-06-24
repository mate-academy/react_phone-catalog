import styles from './SectionTitle.module.scss';

type SectionTitleProps = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h1 className={styles.title}>{children}</h1>;
};
