import { ProductDetails } from '../../../types/ProductDetails';

import './Description.scss';

type Props = {
  details: ProductDetails,
};

export const Description: React.FC<Props> = ({ details }) => (
  <section className="description">
    <div className="description__about">
      <h2 className="description--title">
        About
      </h2>

      {details.description.map(({ title, text }) => (
        <div
          className="description__about-content"
          key={title}
        >
          <h3 className="description__about--title">
            {title}
          </h3>

          <p
            className="description__about--paragraph"
          >
            {text.map(paragraph => paragraph)}
          </p>
        </div>
      ))}
    </div>

    <ul className="description__tech-specs">
      <h2 className="description--title">
        Tech specs
      </h2>

      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Screen
        </div>

        <div className="description__tech-specs--item-value">
          {details.screen}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Resolution
        </div>

        <div className="description__tech-specs--item-value">
          {details.resolution}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Processor
        </div>

        <div className="description__tech-specs--item-value">
          {details.processor}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          RAM
        </div>

        <div className="description__tech-specs--item-value">
          {details.ram}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Built in memory
        </div>

        <div className="description__tech-specs--item-value">
          {details.capacity}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Camera
        </div>

        <div className="description__tech-specs--item-value">
          {details.camera}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Zoom
        </div>

        <div className="description__tech-specs--item-value">
          {details.zoom}
        </div>

      </li>
      <li className="description__tech-specs--item">

        <div className="description__tech-specs--item-title">
          Cell
        </div>

        <div className="description__tech-specs--item-value">
          {details.cell.join(', ')}
        </div>

      </li>
    </ul>
  </section>
);
