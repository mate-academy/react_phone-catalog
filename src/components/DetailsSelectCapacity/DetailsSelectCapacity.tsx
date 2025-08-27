import { NavLink, useLocation } from 'react-router-dom';
import { ProductDetail } from '../../pages/ProductDetails/ProductDetails';
import cn from 'classnames';

import './DetailsSelectCapacity.scss';

interface Props {
  product: ProductDetail;
  products: ProductDetail[];
}

export const DetailsSelectCapacity: React.FC<Props> = ({
  product,
  products,
}) => {
  const DEFAULT_COLOR = product.color;
  const DEFAULT_CAPACITY = product.capacity;

  const modelsByColor = products.filter(model => model.color === DEFAULT_COLOR);

  const { pathname } = useLocation();

  return (
    <div className="capacity capacity--magrin">
      {product.capacityAvailable.map(option => {
        const modelByCapacity = modelsByColor.find(
          item => item.capacity === option,
        );

        if (!modelByCapacity) {
          return null;
        }

        const toUrl = pathname.replace(product.id, modelByCapacity.id);

        return (
          <NavLink
            to={toUrl}
            key={option}
            title={option}
            className={cn('capacity__item', {
              'capacity__item--active': DEFAULT_CAPACITY === option,
            })}
          >
            {option}
          </NavLink>
        );
      })}
    </div>
  );
};
