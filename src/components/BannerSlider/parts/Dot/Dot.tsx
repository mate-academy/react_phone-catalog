import cn from 'classnames';
import './Dot.scss';

type Props = {
  isActive: boolean;
};

export const Dot:React.FC<Props> = ({ isActive }) => {
  return (
    <div
      className={cn('dot',
        { 'dot--active': isActive })}
    />
  );
};
