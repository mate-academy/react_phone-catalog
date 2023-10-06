import { CardParams } from '../../types/CardParams';
import { ProductFull } from '../../types/ProductFull';
import './DetailsTechSpecs.scss';

type Props = {
  product: ProductFull,
};

export const DetailsTechSpecs: React.FC<Props> = ({ product }) => {
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <div className="details-tech-specs">
      <h2 className="title__h-two">
        Tech specs
      </h2>

      <ul className="details-tech-specs__content">
        <li className="details-tech-specs__param">
          <span>
            {CardParams.Screen}
          </span>
          <span className="details-tech-specs__value">
            {screen}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Resolution}
          </span>
          <span className="details-tech-specs__value">
            {resolution}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Processor}
          </span>
          <span className="details-tech-specs__value">
            {processor}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Ram}
          </span>
          <span className="details-tech-specs__value">
            {ram}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Memory}
          </span>
          <span className="details-tech-specs__value">
            {capacity}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Camera}
          </span>
          <span className="details-tech-specs__value">
            {camera}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Zoom}
          </span>
          <span className="details-tech-specs__value">
            {zoom}
          </span>
        </li>

        <li className="details-tech-specs__param">
          <span>
            {CardParams.Cell}
          </span>
          <span className="details-tech-specs__value">
            {cell.join(', ')}
          </span>
        </li>
      </ul>
    </div>
  );
};
