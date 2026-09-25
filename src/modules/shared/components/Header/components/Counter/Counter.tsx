import styles from './Counter.module.scss';

type Props = {
  count: number;
};

export const Counter = ({ count }: Props) => {
  return <span className={styles.counter}>{count}</span>;
};
