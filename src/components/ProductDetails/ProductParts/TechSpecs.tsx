import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  product: ProductSpecs | undefined
};

export const TechSpecs: React.FC<Props> = ({ product }) => (
  <div className="column">
    <h3 className="title is-3">Tech specs</h3>
    <hr />
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
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">Built in memory</p>
      <p className="has-text-weight-semibold">
        {product?.capacity}
      </p>
    </div>
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">Camera</p>
      <p className="has-text-weight-semibold">
        {product?.camera}
      </p>
    </div>
  </div>
);
