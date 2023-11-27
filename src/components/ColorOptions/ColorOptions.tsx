import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  getProductOptionLink,
  getCorrectColor,
} from '../../helpers/calc/helper';
import { ProductDetails } from '../../types/Product';

type ColorOptionsProps = {
  colors: string[]
  currentProduct: ProductDetails,
};

export const ColorOptions: React.FC<ColorOptionsProps> = ({
  colors,
  currentProduct,
}) => {
  return (
    <>
      <p className="product-info__options-title">
        Available colors
      </p>
      <div className="product-info__options-body">
        {colors.map(color => {
          const isActive = currentProduct.color === color;
          const to = getProductOptionLink(currentProduct, color);
          const correctColor = getCorrectColor(color);

          return (
            <Link
              to={`../${to}`}
              key={color}
            >
              <div className={classNames('product-info__color-wrap', {
                'product-info__color-wrap--active': isActive,
              })}
              >
                <div
                  style={{ backgroundColor: correctColor }}
                  className="product-info__color"
                />
              </div>
            </Link>
          );
        })}
      </div>

    </>
  );
};
