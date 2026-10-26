import styles from './IconBadge.module.scss';

type Props = {
  count: number;
};

export const IconBadge = ({ count }: Props) => {
  if (count <= 0) {
    return null;
  }

  return <span className={styles.badge}>{count}</span>;
};
