import cn from 'cn';
import { Link } from 'react-router-dom';
import { getNewCapacityUrl } from '../../../helpers/getNewCapacityUrl';
import { DetailedProduct } from '../../../types/DetailedProduct';
import './CapacityOptions.scss';

type Props = {
  displayedProduct: DetailedProduct;
  capacityAvailable: string[];
  capacity: string;
};

export const CapacityOptions: React.FC<Props> = ({
  displayedProduct,
  capacityAvailable,
  capacity,
}) => {
  return (
    <div className="capacities">
      <p className="capacities__text small-text">Select capacity</p>

      <ul className="capacities__list">
        {capacityAvailable.map((mappedCapacity: string) => (
          <li key={mappedCapacity} className="capacities__item">
            <Link
              className={cn('capacities__link', 'body-text', {
                'capacities__link--active': capacity === mappedCapacity,
              })}
              // Change the capacity to the chosen capacity
              to={getNewCapacityUrl(displayedProduct.id, mappedCapacity)}
            >
              {mappedCapacity}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
