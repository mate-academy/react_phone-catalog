import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getProductOptionLink } from '../../helpers/calc/helper';
import { ProductDetails } from '../../types/Product';

type CapacityOptionsProps = {
  capacityOptions: string[],
  currentProduct: ProductDetails,
};

export const CapacityOptions: React.FC<CapacityOptionsProps> = ({
  capacityOptions,
  currentProduct,
}) => {
  return (
    <>
      <p className="product-info__options-title">
        Select capacity
      </p>
      <div className="product-info__options-body">
        {capacityOptions.map(memory => {
          const isActive = memory === currentProduct.capacity;
          const to = getProductOptionLink(currentProduct, undefined, memory);

          return (
            <Link
              key={memory}
              to={`../${to}`}
              type="button"
              className={classNames('product-info__capacity-btn', {
                'product-info__capacity-btn--active': isActive,
              })}
            >
              {memory}
            </Link>
          );
        })}
      </div>
    </>
  );
};
