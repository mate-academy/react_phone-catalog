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
        {product?.display.screenResolution
          .split(' ').slice(1).join('').slice(1, -1)}
      </p>
    </div>
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">Processor</p>
      <p className="has-text-weight-semibold">
        {product?.hardware.cpu}
      </p>
    </div>
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">RAM</p>
      <p className="has-text-weight-semibold">
        {product?.storage.ram.split('MB').join(' MB') || 'N/A'}
      </p>
    </div>
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">Built in memory</p>
      <p className="has-text-weight-semibold">
        {product?.storage.flash.split('MB').join(' MB') || 'N/A'}
      </p>
    </div>
    <div className="is-flex is-justify-content-space-between">
      <p className="has-text-grey-light">Camera</p>
      <p className="has-text-weight-semibold">
        {product?.camera.primary}
      </p>
    </div>
  </div>
);
