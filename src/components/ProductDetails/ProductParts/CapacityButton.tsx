import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  product: ProductSpecs | undefined
};

export const CapacityButton: React.FC<Props> = ({ product }) => (
  <>
    <p className="
      is-size-7
      has-text-grey
      has-text-weight-semibold
      mb-2
      "
    >
      Select Capacity
    </p>
    <button
      type="button"
      className="button is-outlined is-dark is-small"
    >
      {product?.storage.flash.split('MB').join(' MB') || 'N/A'}
    </button>
  </>
);
