import { Link } from 'react-router-dom';
import './ProductCapacity.scss';
import classNames from 'classnames';
import { getCorrectProductLink } from '../../helpers/getCorrectLink';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  productDetails: ProductDetails,
  // capacitys: string[],
};

export const ProductCapacity: React.FC<Props> = ({
  productDetails,
  // capacitys,
}) => {
  const capacitys = productDetails?.capacityAvailable || [];

  return (
    <div className="product-capacitys">
      <h4 className="product-capacitys__title">
        Select capacity
      </h4>
      <ul className="product-capacitys__list">
        {capacitys.map((capacity: string) => {
          const isActive = productDetails.capacity === capacity;
          const to = getCorrectProductLink(productDetails, undefined, capacity);

          return (
            <Link
              to={`../${to}`}
              key={capacity}
              className={classNames('product-capacitys__link', {
                'product-capacitys__link--active': isActive,
              })}

            >
              {capacity}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
