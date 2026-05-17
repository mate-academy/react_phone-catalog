import style from './Counter.module.scss';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  return <div className={style.counter}>{count}</div>;
};
