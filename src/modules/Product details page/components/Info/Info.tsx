import React from 'react';
import { PhoneType } from '../../../../types/PhoneType';

interface Props {
  product: PhoneType | undefined;
}

export const Info: React.FC<Props> = ({ product }) => {
  return (
    <div className="details__info">
      <div className="details__about">
        <h3 className="details__info--title">About</h3>
        {product?.description.map((desc, index) => (
          <div key={index} className="details__about--block">
            <h4 className="details__about--block-title">{desc.title}</h4>
            <p className="details__about--block-text">{desc.text}</p>
          </div>
        ))}
      </div>
      <div className="details__tech">
        <h3 className="details__info--title">Tech specs</h3>
        <div className="details__specs details__tech--specs">
          <div className="details__spec">
            <span className="details__spec-label">Screen</span>
            <span className="details__spec-value">{product?.screen}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Resolution</span>
            <span className="details__spec-value">{product?.resolution}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Processor</span>
            <span className="details__spec-value">{product?.processor}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">RAM</span>
            <span className="details__spec-value">{product?.ram}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Camera</span>
            <span className="details__spec-value">{product?.camera}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Zoom</span>
            <span className="details__spec-value">{product?.zoom}</span>
          </div>
          <div className="details__spec">
            <span className="details__spec-label">Cell</span>
            <span className="details__spec-value">
              {product?.cell.map((cell, index) => (
                <React.Fragment key={index}>
                  {cell}
                  {index < product.cell.length - 1 && ', '}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
