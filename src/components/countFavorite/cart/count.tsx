import classNames from 'classnames';
import styles from './count.module.scss';
type Props = {
  count: number;
  type?: 'aside';
};
export const Count = ({ count, type }: Props) => {
  return (
    <span
      className={classNames(styles.count, {
        [styles['count--visible']]: type === 'aside',
      })}
    >
      {count}
    </span>
  );
};
