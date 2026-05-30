import { ProductButtons } from '../../../../components/ProductButtons';
import { Price } from '../../../../components/Price';
import { TechSpecs } from '../../../../components/TechSpecs';
import { Product } from '../../../../types/Product';
import { Capacity } from './components/Capacity';
import { Colors } from './components/Colors/Colors';
type Props = {
  product: Product;
};
import './Details.scss';

export const Details: React.FC<Props> = ({ product }) => {
  return (
    <div className={`details`}>
      <Colors product={product} className="border--bottom" />

      <Capacity product={product} className="border--bottom" />

      <div className="details__price">
        <Price
          productId={product.id}
          displayFullPrice={true}
          parentBlock="productPage"
        />
      </div>

      <div className="details__buttons">
        <ProductButtons productId={product.id} />
      </div>

      <TechSpecs
        techSpecs={{
          screen: product.screen,
          resolution: product.resolution,
          processor: product.processor,
          RAM: product.ram,
        }}
      />
    </div>
  );
};
