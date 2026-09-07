import React from 'react';
import './ProductSpec.scss';

type Props = {
  screen: string;
  resolution?: string;
  processor?: string;
  capacity?: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  details: boolean;
};

export const ProductSpec: React.FC<Props> = ({
  screen,
  resolution,
  processor,
  capacity,
  ram,
  camera,
  zoom,
  cell,
  details,
}) => {
  return (
    <div className="product-spec">
      {screen && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Screen
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {screen}
          </p>
        </div>
      )}

      {capacity && !details && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Capacity
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {capacity}
          </p>
        </div>
      )}

      {capacity && details && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Built in memory
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {capacity}
          </p>
        </div>
      )}

      {resolution && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Resolution
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {resolution}
          </p>
        </div>
      )}

      {processor && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Processor
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {processor}
          </p>
        </div>
      )}

      {ram && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">RAM</p>

          <p className="text text__body--uppercase product-spec__item-right">
            {ram}
          </p>
        </div>
      )}

      {camera && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">
            Camera
          </p>

          <p className="text text__body--uppercase product-spec__item-right">
            {camera}
          </p>
        </div>
      )}

      {zoom && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">Zoom</p>

          <p className="text text__body--uppercase product-spec__item-right">
            {zoom}
          </p>
        </div>
      )}

      {cell && (
        <div className="product-spec__item">
          <p className="text text__body--small product-spec__item-left">Cell</p>

          <p className="text text__body--uppercase product-spec__item-right">
            {cell.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
