import './productColor.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { getCorrectProductLink } from '../../helpers/getCorrectLink';
import { getCorrectColor } from '../../helpers/getCorrectColor';

type Props = {
  colors: string[],
  currentColor: string,
  productDetails: ProductDetails,
};

export const ProductColor: React.FC<Props> = ({
  colors,
  currentColor,
  productDetails,
}) => {
  return (
    <div className="product-colors">
      <h4 className="product-colors__title">
        Available colors
      </h4>
      <ul className="product-colors__list">
        {colors.map(color => {
          const isActive = currentColor === color;

          return (
            <Link
              to={`../${getCorrectProductLink(productDetails, color)}`}
              key={color}
              className={classNames('product-colors__link', {
                'product-colors__link--active': isActive,
              })}
            >
              <div
                className="product-colors__color"
                style={{
                  backgroundColor: getCorrectColor(color),
                }}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
