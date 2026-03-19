import styles from './CenteredContent.module.scss';

type Props = {
  children: React.ReactNode;
};

export const CenteredContent: React.FC<Props> = ({ children }) => {
  return <div className={styles.centeredContent}>{children}</div>;
};
