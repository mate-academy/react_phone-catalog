import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  product: string,
  colour: string,
  capacities: string[],
  currCapacity: string,
};

export const Capacity: React.FC<Props> = ({
  capacities, currCapacity, product, colour,
}) => {
  return (
    <div className="capacity__content">
      {capacities.map(capacity => (
        <Link
          to={`/phones/${product}-${capacity.toLowerCase()}-${colour}`}
          className={classNames('capacity__item page__link', {
            'capacity__item--current': capacity === currCapacity,
          })}
          key={capacity}
        >
          {capacity}
        </Link>
      ))}
    </div>
  );
};
