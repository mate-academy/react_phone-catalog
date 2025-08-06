import styles from './itemsCounter.module.scss';

type Props = {
  amount: number;
};

export const ItemsCounter = ({ amount }: Props) => {
  return (
    <div className={styles.counter}>
      <div className={styles.container}>
        <span className={styles.text}>{amount}</span>
        <svg
          className={styles.circle}
          width="14"
          height="14"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="#eb5757"
            stroke="#fff"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};
