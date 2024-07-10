import styles from './Counter.module.scss';
import classNames from 'classnames';

export interface CounterType {
  count: number;
  setNewCount: (count: number) => void;
}

export const Counter: React.FC<CounterType> = ({ setNewCount, count }) => {
  return (
    <div className={styles.counter}>
      <div
        className={classNames(styles.counter__minus, {
          [styles['counter__minus--disabled']]: count === 1,
        })}
        onClick={() => count > 1 && setNewCount(count - 1)}
      ></div>

      <p className={styles.counter__number}>{count}</p>

      <div
        className={styles.counter__plus}
        onClick={() => setNewCount(count + 1)}
      ></div>
    </div>
  );
};
