import './productCapacity.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { getCorrectProductLink } from '../../helpers/getCorrectLink';

type Props = {
  productDetails: ProductDetails,
  capacitys: string[],
};

export const ProductCapacity: React.FC<Props> = ({ productDetails }) => {
  const capacities = productDetails?.capacityAvailable || [];

  return (
    <div className="product-capacities">
      <h4 className="product-capacities__title">
        Select capacity
      </h4>
      <ul className="product-capacities__list">
        {capacities.map(capacity => {
          const isActive = productDetails.capacity === capacity;
          const follow = getCorrectProductLink(
            productDetails, capacity, undefined,
          );

          return (
            <Link
              key={capacity}
              to={`../${follow}`}
              className={classNames(
                'product-capacities__link',
                { 'product-capacities__link--active': isActive },
              )}
            >
              {capacity}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
