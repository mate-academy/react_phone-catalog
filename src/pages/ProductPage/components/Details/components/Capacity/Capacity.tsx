import { Link } from 'react-router-dom';
import { Product } from '../../../../../../types/Product';
import classNames from 'classnames';
import './Capacity.scss';
import { productItem } from '../../../../../../utils/productItem';

type Props = {
  product: Product;
  className: string;
};

export const Capacity: React.FC<Props> = ({ product, className }) => {
  const { namespaceId, capacity, capacityAvailable, color } = product;

  return (
    <div className={`${className} capacity`}>
      <p className="text--grey">Select capacity</p>
      <div className="capacity__items">
        {capacityAvailable.map(currentCapacity => {
          const link = `../${productItem.getLink(namespaceId, currentCapacity, color)}`;

          return (
            <Link
              to={link}
              className={classNames('link capacity__item border', {
                capacity__item__selected: capacity === currentCapacity,
              })}
              key={currentCapacity}
            >
              {currentCapacity}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
