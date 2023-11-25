import classNames from 'classnames';
import './Counter.scss';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  return (
    <span
      className={classNames(
        'Counter',
        { isActive: !!count },
      )}
    >
      {count}
    </span>
  );
};
