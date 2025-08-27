import { NavLink, useLocation } from 'react-router-dom';
import { ProductDetail } from '../../pages/ProductDetails/ProductDetails';
import cn from 'classnames';

import './detailsSelectColor.scss';

interface Props {
  product: ProductDetail;
  products: ProductDetail[];
}

export const DetailsSelectColor: React.FC<Props> = ({ product, products }) => {
  const DEFAULT_COLOR = product.color;
  const DEFAULT_CAPACITY = product.capacity;

  const colorMap: Record<string, string> = {
    'space gray': '#717378',
    spacegray: '#717378',
    midnight: '#191970',
  };

  const transformColor = (color: string) => colorMap[color] ?? color;

  const findByCapacuty = products.filter(
    model => model.capacity === DEFAULT_CAPACITY,
  );

  const { pathname } = useLocation();

  return (
    <div className="details-select-color details-select-color--position-margin">
      {product.colorsAvailable.map(color => {
        const findByColor = findByCapacuty.find(item => item.color === color);

        if (!findByColor) {
          return null;
        }

        const toUrl = pathname.replace(product.id, findByColor.id);

        return (
          <div
            className={cn('details-select-color__border', {
              'details-select-color__border--active': DEFAULT_COLOR === color,
            })}
            key={color}
          >
            <NavLink
              data-color={color}
              to={toUrl}
              title={color}
              className={`color color--${color}`}
              style={{ backgroundColor: transformColor(color) }}
            ></NavLink>
          </div>
        );
      })}
    </div>
  );
};
