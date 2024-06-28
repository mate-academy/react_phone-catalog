import React from 'react';

import './TechspecsContant.scss';
import { ProductDetails } from '../../../types/ProductDetails';

type Props = {
  itemDetails: ProductDetails;
};

const TechspecsContant: React.FC<Props> = ({ itemDetails }) => {
  return (
    <div className="techspecsContant">
      <div className="techspecsContant__block">
        <h3 className="techspecsContant__block-title">Tech specs</h3>
        <div className="techspecsContant__block-line" />
      </div>
      <ul className="techspecsContant__description">
        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Screen
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.screen}
          </span>
        </li>

        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Resolution
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.resolution}
          </span>
        </li>

        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Processor
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.processor}
          </span>
        </li>

        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Ram
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.ram}
          </span>
        </li>

        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Built in memory
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.capacity}
          </span>
        </li>

        {itemDetails.camera && (
          <li className="techspecsContant__description-list">
            <strong className="techspecsContant__description-list-name">
              Camera
            </strong>
            <span className="techspecsContant__description-list-value">
              {itemDetails.camera}
            </span>
          </li>
        )}

        {itemDetails.zoom && (
          <li className="techspecsContant__description-list">
            <strong className="techspecsContant__description-list-name">
              Zoom
            </strong>
            <span className="techspecsContant__description-list-value">
              {itemDetails.zoom}
            </span>
          </li>
        )}

        <li className="techspecsContant__description-list">
          <strong className="techspecsContant__description-list-name">
            Cell
          </strong>
          <span className="techspecsContant__description-list-value">
            {itemDetails.cell.join(', ')}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TechspecsContant;
