import './TechSpecs.scss';

import React from 'react';

type Props = {
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
};

export const TechSpecs: React.FC<Props> = ({
  screen,
  resolution,
  processor,
  ram,
  camera,
  zoom,
  cell,
}) => {
  return (
    <ul className="TechSpecs">
      <li className="TechSpecs__item">
        <span>
          Screen
        </span>

        <span className="TechSpecs__item-value">
          {screen}
        </span>
      </li>

      <li className="TechSpecs__item">
        <span>
          Resolution
        </span>

        <span className="TechSpecs__item-value">
          {resolution}
        </span>
      </li>
      <li className="TechSpecs__item">
        <span>
          Processor
        </span>

        <span className="TechSpecs__item-value">
          {processor}
        </span>
      </li>
      <li className="TechSpecs__item">
        <span>
          RAM
        </span>

        <span className="TechSpecs__item-value">
          {ram}
        </span>
      </li>

      <li className="TechSpecs__item">
        <span>
          Camera
        </span>

        <span className="TechSpecs__item-value">
          {camera}
        </span>
      </li>

      <li className="TechSpecs__item">
        <span>
          Zoom
        </span>

        <span className="TechSpecs__item-value">
          {zoom}
        </span>
      </li>

      <li className="TechSpecs__item">
        <span>
          Cell
        </span>

        <span className="TechSpecs__item-value">
          {cell.join(', ')}
        </span>
      </li>
    </ul>
  );
};
