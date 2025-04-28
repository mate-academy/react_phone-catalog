import styles from './BadgeCounter.module.scss';

type Props = {
  count: number;
};

export const BadgeCounter: React.FC<Props> = ({ count }) => {
  return <span className={styles.badgeCounter}>{count}</span>;
};
