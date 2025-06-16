import styles from './QuantityBadge.module.scss';

type Props = {
  count: number;
};

export const QuantityBadge: React.FC<Props> = ({ count }) => {
  if (!count) return null;

  return <span className={styles.quantityBadge}>{count}</span>;
};
