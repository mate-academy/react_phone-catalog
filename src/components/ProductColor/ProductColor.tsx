import './ProductColor.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getCorrectColor } from '../../helpers/getCorrectColor';
import { getCorrectProductLink } from '../../helpers/getCorrectLink';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  productDetails: ProductDetails,
  // colors: string[],
  // currentColor: string,
};

export const ProductColor: React.FC<Props> = ({
  productDetails,
  // colors,
  // currentColor,
}) => {
  const colors = productDetails?.colorsAvailable || [];
  const currentColor = productDetails?.color || '';

  return (
    <div className="product-colors">
      <h4 className="product-colors__title">
        Available colors
      </h4>
      <ul className="product-colors__list">
        {colors.map((color: string) => {
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
