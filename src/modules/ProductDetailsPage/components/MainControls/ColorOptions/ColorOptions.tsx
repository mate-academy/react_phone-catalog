import './ColorOptions.scss';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { getColor } from '../helpers/colors';
import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../../../../../helpers/getLinkClass';
type Props = {
  product: ProductDetails | null;
};

export const ColorOptions: React.FC<Props> = ({ product }) => {
  const namespaceId = product ? product.namespaceId : '';
  const capacity = product ? product.capacity.toLowerCase() : '';

  return (
    <div className="colorOptions">
      <p className="colorOptions__title small-text">Available colors</p>
      <div className="colorOptions__variable">
        {product?.colorsAvailable.map(color => (
          <NavLink
            key={color}
            to={`../${namespaceId}-${capacity}-${color.replace(/ /g, '-')}`}
            title={color}
            className={({ isActive }) =>
              getLinkClass(isActive, 'colorOptions__colorWrap')
            }
          >
            <div
              className="colorOptions__color"
              style={{ backgroundColor: getColor(color) }}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
