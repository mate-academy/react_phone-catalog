import './ProductCardInfo.style.scss';

import { Product } from '../../../../types/Product';

import { ProductCardButtons } from '../ProductCardButtons/ProductCardButtons';
import { ProductTechSpecs } from '../ProductTechSpecs/ProductTechSpec';
import { ProductPrice } from '../ProductPrice/ProductPrice';

type Props = {
  product: Product;
};

export const ProductCardInfo: React.FC<Props> = ({ product }) => {
  const { name, screen, capacity, ram, itemId, fullPrice, price } = product;
  const productSpecs = { screen, capacity, ram };

  return (
    <div className="product-info">
      <p className="product-info__name">{name}</p>

      <div className="product-info__price-wrap">
        <ProductPrice regularPrice={fullPrice} discountPrice={price} />
      </div>

      <ProductTechSpecs specs={productSpecs} />

      <ProductCardButtons id={itemId} />
    </div>
  );
};
