import './ProductCardInfo.style.scss';

import { Product } from '../../../../types/Product';

import { ProductCardButtons } from '../ProductCardButtons/ProductCardButtons';
import { ProductTechSpecs } from '../ProductTechSpecs/ProductTechSpec';

type Props = {
  product: Product;
};

export const ProductCardInfo: React.FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram } = product;
  const productSpecs = {screen, capacity, ram};

  return (
    <div className="product-info">
      <p className="product-info__name">{`${name}(iMT9G2FS/A)`}</p>

      <div className="product-info__price">
        <p className="product-info__price--regular">{`$${fullPrice}`}</p>

        {price && <p className="product-info__price--discount">{`$${price}`}</p>}
      </div>

      <ProductTechSpecs specs={productSpecs}/>

      <ProductCardButtons product={product} />

    </div>
  );
};
