import { Product } from '../../../types/Product';

type Props = {
  product: Product
};

export const PricePart: React.FC<Props> = ({ product }) => (
  <div className="mb-2">
    {product.price
      ? (
        <>
          <span className="py-2 has-text-weight-bold">{`$${product.price}`}</span>
          <span>&nbsp;&nbsp;</span>
          <span className="has-text-grey-light py-2 productCard__old-price">{`$${product.fullPrice}`}</span>
        </>
      )
      : (
        <span className="py-2 has-text-weight-bold">{`$${product.fullPrice}`}</span>
      )}
  </div>
);
