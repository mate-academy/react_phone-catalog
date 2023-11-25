import { Product } from '../../types/Product';
import { ProductCardButtons } from './ProductCardButtons';

type Props = {
  product: Product;
};

export const ProductCardDescription: React.FC<Props> = ({ product }) => {
  const discountSum = Math.ceil((product.price / 100) * product.discount);

  const price = product.discount > 0
    ? `$${product.price - discountSum}`
    : `$${product.price}`;

  const discount = product.discount === 0
    ? undefined
    : `$${product.price}`;

  return (
    <>
      <div className="product-content__card__price">
        <p>{price}</p>
        <p className="product-content__card__price-old">{discount}</p>
      </div>

      <div className="product-content__card__description">
        <div className="product-content__card__description-items">
          <p
            className="product-content__card__description-items__params"
          >
            Screen
          </p>

          <p>{product.screen || '-'}</p>
        </div>

        <div className="product-content__card__description-items">
          <p
            className="product-content__card__description-items__params"
          >
            Capacity
          </p>

          <p>{product.capacity || '-'}</p>
        </div>

        <div className="product-content__card__description-items">
          <p
            className="product-content__card__description-items__params"
          >
            Ram
          </p>

          <p>{product.ram || '-'}</p>
        </div>

      </div>

      <ProductCardButtons product={product} />

    </>
  );
};
