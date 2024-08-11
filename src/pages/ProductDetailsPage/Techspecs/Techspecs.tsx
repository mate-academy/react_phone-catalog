import React from 'react';

import './Techspecs.scss';
import { ProductDetails } from '../../../shared/types/ProductDetails';

type Props = {
  itemDetails: ProductDetails;
};

export const Techspecs: React.FC<Props> = ({ itemDetails }) => {
  return (
    <div className="techspecs">
      <div className="techspecs__block">
        <h3 className="techspecs__block-title">Tech specs</h3>
        <div className="techspecs__block-line" />
      </div>
      <ul className="techspecs__description">
        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Screen</p>
          <span className="techspecs__description-list-value">
            {itemDetails.screen}
          </span>
        </li>

        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Resolution</p>
          <span className="techspecs__description-list-value">
            {itemDetails.resolution}
          </span>
        </li>

        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Processor</p>
          <span className="techspecs__description-list-value">
            {itemDetails.processor}
          </span>
        </li>

        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Ram</p>
          <span className="techspecs__description-list-value">
            {itemDetails.ram}
          </span>
        </li>

        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Built in memory</p>
          <span className="techspecs__description-list-value">
            {itemDetails.capacity}
          </span>
        </li>

        {itemDetails.camera && (
          <li className="techspecs__description-list">
            <p className="techspecs__description-list-name">Camera</p>
            <span className="techspecs__description-list-value">
              {itemDetails.camera}
            </span>
          </li>
        )}

        {itemDetails.zoom && (
          <li className="techspecs__description-list">
            <p className="techspecs__description-list-name">Zoom</p>
            <span className="techspecs__description-list-value">
              {itemDetails.zoom}
            </span>
          </li>
        )}

        <li className="techspecs__description-list">
          <p className="techspecs__description-list-name">Cell</p>
          <span className="techspecs__description-list-value">
            {itemDetails.cell.join(', ')}
          </span>
        </li>
      </ul>
    </div>
  );
};
