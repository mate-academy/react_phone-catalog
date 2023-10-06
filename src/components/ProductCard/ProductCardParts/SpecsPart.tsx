import { Product } from '../../../types/Product';

type Props = {
  product: Product
};

export const SpecsPart: React.FC<Props> = ({ product }) => {
  const screen = product.screen.split(' ').join('').replace('inches', '"');
  const capacity = (
    +product.capacity.replace('MB', '') / 1000).toFixed(1).concat(' GB');
  const ram = (
    +product.ram.replace('MB', '') / 1000).toFixed(1).concat(' GB');

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">screen</p>
        <p className="has-text-weight-semibold">
          {screen}
        </p>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">capacity</p>
        <p className="has-text-weight-semibold">{capacity}</p>
      </div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p className="has-text-grey-light">RAM</p>
        <p className="has-text-weight-semibold">{ram}</p>
      </div>
    </>
  );
};
