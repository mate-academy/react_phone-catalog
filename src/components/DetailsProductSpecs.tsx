import { Details } from '../types/Details';

type Props = {
  details: Details;
};

export const DetailsProductSpecs: React.FC<Props> = ({ details }) => (
  <div className="details-specs-container">
    <h2 className="details-specs-container__title">
      Tech specs
    </h2>
    <div className="details-specs-container__underline" />
    <div className="details-specs-container__list">
      <div className="specs-block">
        <div className="specs-block__name">
          Screen
        </div>
        <div className="specs-block__text">
          {details.screen}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Resolution
        </div>
        <div className="specs-block__text">
          {details.resolution}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          RAM
        </div>
        <div className="specs-block__text">
          {details.ram}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Screen
        </div>
        <div className="specs-block__text">
          {details.screen}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Built in memory
        </div>
        <div className="specs-block__text">
          {details.capacity}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Camera
        </div>
        <div className="specs-block__text">
          {details.camera}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Zoom
        </div>
        <div className="specs-block__text">
          {details.zoom}
        </div>
      </div>
      <div className="specs-block">
        <div className="specs-block__name">
          Cell
        </div>
        <div className="specs-block__text">
          {details.cell}
        </div>
      </div>
    </div>
  </div>
);
