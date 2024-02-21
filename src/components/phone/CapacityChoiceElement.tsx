/* eslint-disable */
import './ProductCard.scss';
import classNames from 'classnames';

type Props = {
  capacity: string,
  selectedCapacity: string,
  onClick: (id: string) => void,
};

export const CapacityChoiceElement: React.FC<Props> = ({
  capacity, selectedCapacity, onClick,
}) => {
  return (
    <div
    id={capacity}
    className={classNames('capacity-square mr-8', {
      'capacity-selected': selectedCapacity === capacity
    })}
    onClick={(event) => onClick(event.currentTarget.id)}
  >
    {capacity}
  </div>
  )
};
