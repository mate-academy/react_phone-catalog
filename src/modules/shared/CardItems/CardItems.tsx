import React from 'react';
import './CardItems.scss';

type Props = {
  screen: string;
  resolution?: string;
  capacity?: string;
  processor?: string;
  ram: string;
  memory?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export const CardItems: React.FC<Props> = ({
  screen,
  resolution,
  capacity,
  processor,
  memory,
  ram,
  camera,
  zoom,
  cell,
}) => {
  return (
    <div className="card-items">
      <p className="card-items__item">
        <span className="card-items__key">Screen</span>
        {screen}
      </p>

      {resolution && (
        <p className="card-items__item">
          <span className="card-items__key">Resolution</span>
          {resolution}
        </p>
      )}

      {capacity && (
        <p className="card-items__item">
          <span className="card-items__key">Capacity</span>
          {capacity}
        </p>
      )}

      {processor && (
        <p className="card-items__item">
          <span className="card-items__key">Processor</span>
          {processor}
        </p>
      )}

      <p className="card-items__item">
        <span className="card-items__key">RAM</span>
        {ram}
      </p>

      {memory && (
        <p className="card-items__item">
          <span className="card-items__key">Built in memory</span>
          {memory}
        </p>
      )}

      {camera && (
        <p className="card-items__item">
          <span className="card-items__key">Camera</span>
          {camera}
        </p>
      )}

      {zoom && (
        <p className="card-items__item">
          <span className="card-items__key">Zoom</span>
          {zoom}
        </p>
      )}

      {cell && (
        <p className="card-items__item">
          <span className="card-items__key">Cell</span>
          {cell.join(', ')}
        </p>
      )}
    </div>
  );
};
