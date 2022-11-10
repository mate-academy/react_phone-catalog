import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  product: ProductSpecs | undefined
};

export const MainSpecs: React.FC<Props> = ({ product }) => {
  const screen = product?.display.screenSize.split(' ')
    .join('').replace('inches', '"');

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">Screen</p>
        <p className="has-text-weight-semibold">
          {screen}
        </p>
      </div>
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
    </>
  );
};
