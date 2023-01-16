import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  product: ProductSpecs | undefined
};

export const MainSpecs: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">Screen</p>
        <p className="has-text-weight-semibold">
          {product?.screen}
        </p>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">Resolution</p>
        <p className="has-text-weight-semibold">
          {product?.resolution}
        </p>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">Processor</p>
        <p className="has-text-weight-semibold">
          {product?.processor}
        </p>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">RAM</p>
        <p className="has-text-weight-semibold">
          {product?.ram}
        </p>
      </div>
    </>
  );
};
