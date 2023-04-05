import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { Capacity } from '../types/Capacity';
import { phoneByCapacity } from '../utils/detailsUtils';

type Props = {
  capacities: Capacity[],
  name: string,
  phones: Phone[],
};

export const CapacityDetails: React.FC<Props> = ({
  capacities,
  name,
  phones,
}) => {
  return (
    <div className="capacity-details">
      <div className="details-select-container__paragraph">
        Select capacity
      </div>
      <ul className="capacity-details__collection">
        {capacities.map(capacity => (
          <li key={capacity}>
            <NavLink
              to={`/Phones/${phoneByCapacity(capacity, name, phones)}`}
              className={({ isActive }) => classNames(
                'capacity',
                { 'active-capacity': isActive },
              )}
            >
              <div>{capacity}</div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="details-select-container__underline" />
    </div>
  );
};
