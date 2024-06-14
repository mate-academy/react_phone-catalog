import { Link } from 'react-router-dom';
import { Product } from '../../../../../../types/Product';
import { productItem } from '../../../../../../utils/utils';
import classNames from 'classnames';
import './Capacity.scss';

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
              className={classNames('link capacity__item', {
                'button ': capacity != currentCapacity,
                'button button--black': capacity === currentCapacity,
              })}
              key={currentCapacity}
            >
              <p>{currentCapacity}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
