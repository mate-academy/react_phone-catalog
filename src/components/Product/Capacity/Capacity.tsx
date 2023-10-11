import { Link } from 'react-router-dom';

import classNames from 'classnames';
import './Capacity.scss';

import { ProductDetails } from '../../../types/ProductDetails';
import { getCurrentLink } from '../../../helpers/getCurrentLink';

type Props = {
  capacities: string[],
  productDetails: ProductDetails | null,
};

export const Capacity: React.FC<Props> = ({
  capacities,
  productDetails,
}) => (
  <div className="capacity">
    <p className="capacity--title">
      Select capacity
    </p>

    <ul className="capacity__list">
      {capacities.map(currentCapacity => {
        const isActive = productDetails?.capacity === currentCapacity;

        return (
          <Link
            key={currentCapacity}
            to={`../${getCurrentLink(productDetails, undefined, currentCapacity)}`}
            className={classNames('capacity--link', {
              'capacity--link-active': isActive,
            })}
          >
            {currentCapacity}
          </Link>
        );
      })}
    </ul>
  </div>
);
