import React from 'react';

type Props = {
  screen: string,
  resolution: string,
  ram: string,
  processor: string,
  memory: string,
  camera: string,
  zoom: string,
  cell: string[],
};

export const ProductSpecs: React.FC<Props> = ({
  screen,
  resolution,
  ram,
  processor,
  memory,
  camera,
  zoom,
  cell,
}) => {
  return (
    <div className="product__specs">
      <div className="product__subtitle">
        Tech specs
      </div>

      <div className="product__line" />

      <div className="product__specs-container">
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Screen
          </p>

          <p className="product__specs-value">
            {screen}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Resolution
          </p>

          <p className="product__specs-value">
            {resolution}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Processor
          </p>

          <p className="product__specs-value">
            {processor}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            RAM
          </p>

          <p className="product__specs-value">
            {ram}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Build in memory
          </p>

          <p className="product__specs-value">
            {memory}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Camera
          </p>

          <p className="product__specs-value">
            {camera}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Zoom
          </p>

          <p className="product__specs-value">
            {zoom}
          </p>
        </div>
        <div className="product__specs-wrapper">
          <p className="product__specs-name">
            Cell
          </p>

          <p className="product__specs-value">
            {cell.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};
