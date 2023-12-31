import cn from 'classnames';

import './Counter.scss';

type Props = {
  quantity: number;
};

export const Counter: React.FC<Props> = ({ quantity }) => {
  return (
    <div
      className={cn(
        'Counter',
        { Counter_active: quantity > 0 },
      )}
    >
      {quantity}
    </div>
  );
};
