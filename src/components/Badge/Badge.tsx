import styles from './Badge.module.scss';

type Props = {
  count: number;
};

export function Badge({ count }: Props) {
  if (count === 0) {
    return null;
  }

  return <span className={styles.badge}>{count}</span>;
}
