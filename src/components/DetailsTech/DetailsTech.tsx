import React from 'react';
import { ProductDetailed } from '../../types/ProductDetailed';

import './DetailsTech.scss';

type Props = {
  product: ProductDetailed;
};

export const DetailsTech: React.FC<Props> = ({ product }) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    product;

  return (
    <div className="tech">
      <h3 className="tech__title">Tech specs</h3>
      <ul className="tech__specs">
        <li className="tech__spec-item">
          <p className="tech__text">Screen</p>
          <p className="tech__spec">{screen}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Resolution</p>
          <p className="tech__spec">{resolution}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Processor</p>
          <p className="tech__spec">{processor}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">RAM</p>
          <p className="tech__spec">{ram}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Built in memory</p>
          <p className="tech__spec">{capacity}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Camera</p>
          <p className="tech__spec">{camera}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Zoom</p>
          <p className="tech__spec">{zoom}</p>
        </li>
        <li className="tech__spec-item">
          <p className="tech__text">Cell</p>
          <p className="tech__spec">{cell.join(', ')}</p>
        </li>
      </ul>
    </div>
  );
};
