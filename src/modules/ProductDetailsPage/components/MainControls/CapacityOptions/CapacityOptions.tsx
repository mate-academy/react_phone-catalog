import './CapacityOptions.scss';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../../../../../helpers/getLinkClass';
type Props = {
  product: ProductDetails | null;
};

export const CapacityOptions: React.FC<Props> = ({ product }) => {
  const namespaceId = product ? product.namespaceId : '';
  const color = product ? product.color.replace(/ /g, '-') : '';

  return (
    <div className="capacityOptions">
      <p className="capacityOptions__title small-text">Select capacity</p>
      <div className="capacityOptions__variable">
        {product?.capacityAvailable.map(capacity => (
          <NavLink
            key={capacity}
            to={`../${namespaceId}-${capacity.toLowerCase()}-${color}`}
            className={({ isActive }) =>
              getLinkClass(isActive, 'capacityOptions__capacityWrap')
            }
          >
            <p>{capacity}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
