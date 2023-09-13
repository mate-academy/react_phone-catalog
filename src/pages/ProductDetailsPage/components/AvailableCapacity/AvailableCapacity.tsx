import classNames from 'classnames';
import './AvailableCapacity.scss';
import { Link } from 'react-router-dom';

type Props = {
  currCapacity: string,
  capacities: string[],
  nameSpaceId: string,
  color: string,
};

export const AvailableCapacity: React.FC<Props> = ({
  capacities,
  currCapacity,
  nameSpaceId,
  color,
}) => {
  return (
    <div className="capacity">
      <div className="capacity__list">
        {capacities.map(capacity => (
          <Link
            to={`/phones/${nameSpaceId}-${capacity.toLowerCase()}-${color}`}
            key={capacity}
            type="button"
            className={classNames('capacity__btn', {
              'capacity__btn--current': capacity === currCapacity,
            })}
          >
            {capacity}
          </Link>
        ))}
      </div>
    </div>
  );
};
