import classNames from 'classnames';
import '../../styles/components/Counter/Counter.scss';

type Props = {
  quantity: number;
};

export const Counter: React.FC<Props> = ({ quantity }) => {
  return (
    <span className={classNames('counter', {
      'is-active': quantity,
    })}
    >
      {quantity}
    </span>
  );
};
